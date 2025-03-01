'use strict';

const crypto = require('crypto');


/**
 *
 * @param {String} bearerToken
 * @return {Object}
 */
async function decryptUsingSymmetricKey(ciphertext, symmetricKeys) {
    const stats = {success: false, data: null, message: null};
    stats.data = {
      "mid": "YOUTUBE001",
      "channel": "api",
      "account_number": "602525300001",
      "mobile_number": "9885337002",
      "terminalId": "terma1",
      "name": "svra1",
      "bank_name": "Canara Bank",
      "mcc": "5411",
      "ifsc_code": "CNRB0000000",
      "checksum": "",
      "additionalNo": " ",
      "sid": "sida1"
  };
  return stats;
}

module.exports = {decryptUsingSymmetricKey};
