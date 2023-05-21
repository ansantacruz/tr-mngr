import { DebugUtilities, MessageError } from '../utilities/DebugUtilities';
import fetch, { HeadersInit } from 'node-fetch';

import Constants from '../utilities/Constants';
import { IFetchInfo } from '../model/IFetchInfo';
import config from '../config';
import debugLib from 'debug';

export default class FetchService {

    public static JsonHeaders: HeadersInit = {
        'Content-Type': 'application/json'
    };

    public static async request(fetchInfo: IFetchInfo): Promise<any> {
        const debug = debugLib('bdb:FetchService:'.concat(fetchInfo.debug));
        const codeError = fetchInfo.codeError;
        const { customTimeout, endpoint, headers, body, method } = fetchInfo;
        try {
            const fetchParams: any = {
              body: JSON.stringify(body),
              method,
              headers,
              timeout: customTimeout !== undefined ? customTimeout : Number(config.fetchTimeout)
            };
            const res = await fetch(endpoint, fetchParams); // NOSONAR
            const resPayload = await res;
            debug('[%s] FetchEndpoint: %j, FetchParams: %j', endpoint, fetchParams);
            debug('[%s] FetchStatus: %s', res.status);
            debug('[%s] FetchResponse: %j', resPayload);
            if (Constants.acceptHttpStatusCode.includes(res.status)) {
              if (res.status !== 202) {
                return resPayload.json();
              }
              return { status: 200, response: 'successful OK' };
            } else {
              const reason = resPayload.json();
              debug(`[%s] ${MessageError}`, reason);
              return Promise.reject({ Code: codeError, StatusCode: res.status, Reason: reason });
            }
        } catch (err) {
            const reason: any = DebugUtilities.getMessage(err);
            debug(`[%s] ${MessageError}`, reason);
            return Promise.reject({ Code: codeError, Reason: reason });
        }
    }
}