const express = require('express');

const qrCallbackRoutes = require('./routesHandler/callback/callbackRoutes');

const apiRouter = express.Router();

module.exports = () =>
    apiRouter
        .use('/v1/callback', qrCallbackRoutes())
        .get('/healthcheck', (req, res) => {
            res.send('secured app is up and running');
        });