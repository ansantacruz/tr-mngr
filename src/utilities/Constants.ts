import { HeadersInit } from 'node-fetch';

export interface IFetchInfo {
    endpoint: string;
    method: string;
    headers: HeadersInit;
    debug: string;
    codeError: string;
    body?: any;
    customTimeout?: number;
    requestDetail: string;
}
export default class Constants {
    public static readonly acceptHttpStatusCode: number[] = [200, 201, 202, 204, 206];
}