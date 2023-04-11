import { HeadersInit } from 'node-fetch';

export interface IFetchInfo {
    endpoint: string;
    method: string;

    debug: string;
    codeError: string;
    body?: any;
    customTimeout?: number;

}