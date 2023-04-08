import { IUserAddGeographyResponse } from '../model/IUserAddGeographyRequest';
import { MessageError } from '../utilities/DebugUtilities';
import { QueryTypes } from 'sequelize';
import debugLib from 'debug';
import { executeSQL } from '../database/database';

const debug = debugLib('tc:geographyDataSource');

export default class GeographyDataSource {

    public static readonly getRangeByUser = async function (idBuyer: number): Promise<string> {
        debug('Starts the database query of the search range by user');
        try {
            const result = await executeSQL(
                `SELECT com_rango_busqueda as rango
                FROM tr_data_base.comprador
                WHERE com_id=$idBuyer;`,
                QueryTypes.SELECT,
                { idBuyer }
            );
            if (result.length > 0) {
                return Promise.resolve(result[0].rango.toString());
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'SELECT-RANGE-BY-USER-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-RANGE-BY-USER', Reason: err });
        }
    };

    // eslint-disable-next-line max-len
    public static readonly getOverwriteRange = async (rangoBusqueda: number, idComprador: number): Promise<IUserAddGeographyResponse> => {
        debug('Starts the database query of the update');
        try {
            let result;
            // eslint-disable-next-line max-len
            result = await executeSQL( //El query esta mal, select solo es para traer datos, buscar como se hace un update en sql
                `UPDATE tr_data_base.comprador
                SET com_rango_busqueda=$rangoBusqueda where com_id=$idComprador;`,
                QueryTypes.UPDATE,  // reemplazar la palabra select por UPDATE
                { rangoBusqueda, idComprador }
            );
            console.log(result)
            if (result) {
                console.log("resultado", result);
                const response = {
                    operationStatus: true,
                    operationCode: "0000",
                    operationMessage: "operacion exitosa"
                } as IUserAddGeographyResponse;
                return Promise.resolve(response);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyError = {
                    CodeError: 'SELECT-SEARCH-PRODUCT-TYPES-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyError);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-PRODUCT-TYPES', Reason: err });
        }
    };
    public static readonly getUserNotification = async function (
        latitud: string,
        longitud: string,
        rangoDeBusqueda: string
    ): Promise<string> {
        debug('Starts the database query of the search range by user');
        try {
            const result = await executeSQL(
                `SELECT ven_usuario
                FROM tr_data_base.vendedor
                WHERE 6371 * 2 * ASIN(SQRT(POWER(SIN((ven_latitud - $latitud) * pi()/180 / 2), 2) + COS(4.559133 * pi()/180) * COS(4.559133 * pi()/180) * POWER(SIN((ven_longitud - $longitud) * pi()/180 / 2), 2))) < $rangoDeBusqueda;`,
                QueryTypes.SELECT,
                { latitud, longitud, rangoDeBusqueda }
            );
            if (result.length > 0) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'SELECT-RANGE-BY-USER-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-RANGE-BY-USER', Reason: err });
        }
    };
}
