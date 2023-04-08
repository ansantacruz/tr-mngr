import { Request, Response, Router, response } from 'express';

import { DebugUtilities } from '../utilities/DebugUtilities';
import { GeographyService } from '../services/GeographyService';
import HTTP_STATUS_CODES from 'http-status';
import RequestLogger from '../utilities/RequestLogger';
import debugLib from 'debug';

const debug = debugLib('tc:GeographyController');
const GeographyController = Router();

GeographyController.get(
    '/geographyc/get-search-range/:idBuyer',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const idBuyer = +req.params.idBuyer;
            const response = await GeographyService.getRangeByUser(idBuyer);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-SparePartsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

GeographyController.put( // no es un get, es un put
    '/geography/overwriterange',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const response = await GeographyService.getOverwriteRange(req.body);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-ProductsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);
GeographyController.get(
    '/geographyc/getUserNotification/:latitud/:longitud/:rangoDeBusqueda',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const latitud = req.params.latitud;
            const longitud = req.params.longitud;
            const rangoDeBusqueda = req.params.rangoDeBusqueda;
            const response = await GeographyService.getUserNotification(latitud, longitud, rangoDeBusqueda);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-SparePartsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

export default GeographyController;
