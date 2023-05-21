import { IUserPurchaseRequest, IUserPurchaseResponse, IUserSellerRequest, } from "../model/IUserPurchase";

import { Endpoint } from "aws-sdk";
import { Endpoints } from "../model/Endpoints";
import FetchService from "./FetchService";
import { IFetchInfo } from "../model/IFetchInfo";
import debugLib from 'debug';
import { response } from 'express';

const debug = debugLib('John');

export class PurchaseService {


   constructor() {}
   public static async putPurchase(dataRequest: IUserPurchaseRequest): Promise<any> {
      try {
         const fetchInfo: IFetchInfo = {
            codeError: 'Geography-mngr',
            debug: '',
            endpoint: `${Endpoints.GEOGRAPHYC_MANAGMENT}${Endpoints.GET_USER_NOTIFICATION}/${dataRequest.latitud}/${dataRequest.longitud}/${dataRequest.rangoDeBusqueda}`,
            method: 'GET',

         };
         const response = await FetchService.request(fetchInfo);
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain products types- %s ', err);
         return Promise.reject(err);
      }
   }

   public static async SellPurchase(dataRequest: IUserSellerRequest): Promise<any> {
      try {
         return Promise.resolve({mensaje:"CualquierCosa"});
      } catch (err) {
         debug('Error trying to obtain products types- %s ', err);
         return Promise.reject(err);
      }
   }
}
