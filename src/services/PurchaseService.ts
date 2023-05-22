import { IUserPurchaseRequest, IUserPurchaseResponse, } from "../model/IUserPurchase";

import { Endpoint } from "aws-sdk";
import { Endpoints } from "../model/Endpoints";
import FetchService from "./FetchService";
import { IFetchInfo } from "../model/IFetchInfo";
import debugLib from 'debug';
import { response } from 'express';
import { Vendedores } from '../model/Vendedores';
import { HeadersInit } from 'node-fetch';

const debug = debugLib('John');

export class PurchaseService {

   
   public static JsonHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAx2UUDLc:APA91bHe9qAS83UlGWWvxGYgpROuFknrSzPgv2OsusF89K8kXCCy2fe6k3tBMXuYuW2WcZwt8MpAvDfObUDmSab7KZh9saaYT1STWLF6bLj7fNUa_BtFpAtrKg-cyxX3XYyJqDrsl5Fn',
  };
   public static JsonHeadersTwo: HeadersInit = {
      'Content-Type': 'application/json',
  };


   constructor() {}
   public static async putPurchase(dataRequest: IUserPurchaseRequest): Promise<any> {
      try {
         const fetchInfo: IFetchInfo = {
            codeError: 'Geography-mngr',
            debug: '',
            headers: this.buildOfficesHeadersNormal(),
            endpoint: `${Endpoints.GEOGRAPHYC_MANAGMENT}${Endpoints.GET_USER_NOTIFICATION}/${dataRequest.latitud}/${dataRequest.longitud}/${dataRequest.rangoDeBusqueda}`,
            method: 'GET',

         };
         const response = await FetchService.request(fetchInfo);

         response.forEach( async (obj: Vendedores) => {
            const fetchRequest: any = {
               codeError: 'Comprador notification',
               debug: '',
               endpoint: `https://fcm.googleapis.com/fcm/send`,
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `key=AAAAx2UUDLc:APA91bHe9qAS83UlGWWvxGYgpROuFknrSzPgv2OsusF89K8kXCCy2fe6k3tBMXuYuW2WcZwt8MpAvDfObUDmSab7KZh9saaYT1STWLF6bLj7fNUa_BtFpAtrKg-cyxX3XYyJqDrsl5Fn`,
               },
               body: {
                  to: obj.usu_token,
                  notification: {
                     title: 'Tienes una nueva compra para ofertar',
                     body: 'Revisa tu telefono, tienes una nueva compra para que construyas una oferta',
                     click_action: 'https://ejemplo.com',
                     sound : 'default'
                 },
                 data: {package: dataRequest.package}
               }
            };
            await FetchService.request(fetchRequest);
         });


         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain products types- %s ', err);
         return Promise.reject(err);
      }
   }

   public static async putOffer(dataRequest: any): Promise<any> {
      try {
         const fetchRequest: any = {
            codeError: 'Vendedor notification',
            debug: '',
            endpoint: `https://fcm.googleapis.com/fcm/send`,
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `key=AAAAx2UUDLc:APA91bHe9qAS83UlGWWvxGYgpROuFknrSzPgv2OsusF89K8kXCCy2fe6k3tBMXuYuW2WcZwt8MpAvDfObUDmSab7KZh9saaYT1STWLF6bLj7fNUa_BtFpAtrKg-cyxX3XYyJqDrsl5Fn`,
            },
            body: {
               to: dataRequest.vendedor.token,
               notification: {
                  title: 'Tienes una nueva oferta para revisar',
                  body: 'Revisa tu telefono, tienes una nueva oferta a tu compra',
                  click_action: 'https://ejemplo.com',
                  sound : 'default'
              },
              data: {oferta: dataRequest}
            }
         };
         await FetchService.request(fetchRequest);
      } catch (err) {
         debug('Error trying to obtain products types- %s ', err);
         return Promise.reject(err);
      }
   }

   private static buildOfficesHeadersNormal(): HeadersInit {
      return {
         'Content-Type': 'application/json',
      };
   }
}
