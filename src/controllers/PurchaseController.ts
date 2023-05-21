import { Request, Response, Router, response } from 'express';

import { DebugUtilities } from '../utilities/DebugUtilities';
import HTTP_STATUS_CODES from 'http-status';
import { PurchaseService } from '../services/PurchaseService';
import RequestLogger from '../utilities/RequestLogger';
import debugLib from 'debug';

const debug = debugLib('tc:purchaseontroller');
const Purchaseontroller = Router();

Purchaseontroller.put(
    '/purchaseManager/notifyPurchase',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const response = await PurchaseService.putPurchase(req.body);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-ProductsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);


Purchaseontroller.put(
    '/purchaseManager/notifyOffer',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const response = await PurchaseService.putOffer(req.body);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-ProductsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);



export default Purchaseontroller;
