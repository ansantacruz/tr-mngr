export interface IUserAddGeographyRequest {
    idComprador: number;
    rangoBusqueda: number;
}
export interface IUserAddGeographyResponse {
    operationStatus: boolean;
    operationCode: string;
    operationMessage:string;
}
