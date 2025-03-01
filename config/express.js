const express = require('express');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const logger = require('../config/logger');
const routes = require('../routes');

module.exports = () => {
    const app = express();

    app.disable('x-powered-by');
    app.use(cookie());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('combined', {
        stream: logger.stream
    }));

    // CORS Request
    app.all('*', (req, res, next) => {
        if (!req.get('Origin')) return next();
        // use '*' here to access any origin
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.set('Access-Control-Expose-Headers', '*');

        if ('OPTIONS' == req.method) return res.sendStatus(200);
        next();
    });

    app.use('/api', routes());
    return app;
}

