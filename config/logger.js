const appRoot = require('app-root-path');
const pino =require('pino');

const transport = pino.transport({
  targets: [
    {
      level: 'error',
      target: 'pino/file',
      options: {
        destination: `${appRoot}/logs/error.log`
      }
    },{
      level: 'info',
      target: 'pino-pretty',
    },
    {
      level: 'info',
      target: 'pino/file',
      options: {
        destination: `${appRoot}/logs/app.log`
      }
    }
]})
const logger = pino(transport)

logger.stream = {
  write: (message) => {
    logger.info(message);
  }
};

module.exports = logger;
