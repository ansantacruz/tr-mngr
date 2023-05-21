import { HeadersInit } from 'node-fetch';


export interface IFetchInfo {
    endpoint: string;
    method: string;
    headers: HeadersInit;
    debug: string;
    codeError: string;
    body?: any;
    customTimeout?: number;

}