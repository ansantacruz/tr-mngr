export interface IUserPurchaseRequest {
    package: any;
    latitud: string;
    longitud: string;
    rangoDeBusqueda: number;
}
export interface IUserPurchaseResponse {
    operationStatus: boolean;
    operationCode: string;
    operationMessage:string;
}
