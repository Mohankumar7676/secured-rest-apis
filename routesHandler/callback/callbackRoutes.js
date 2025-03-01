'use strict';

const Router = require('express-promise-router');

const qrCallbackHandler = require('../../modules/callback/qrCallbackHandler');

const callbackRoutes = () => {
    const router = Router({ mergeParams: true });

    router.route('/qr').post(qrCallbackHandler.processQRCallback);

    router.route('/healthcheck').get((req, res) => {
        res.status(200).json({ status: 'OK', message: 'secure app - callback is up and running' });
    });


    return router;
};

module.exports = callbackRoutes;