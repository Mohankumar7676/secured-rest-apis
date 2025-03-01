'use strict';

const logger = require('./config/logger');

const PORT = process.env.PORT || 3000;

const setupExpress = require('./config/express');
const app = setupExpress();

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
  logger.info(`Server started on PORT: ${PORT}`);
});
