'use strict';

const { json } = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


/**
 *
 * @param {String} token
 * @return {Object}
 */
async function decryptUsingSymmetricKey(token, AES_KEY) {
      const stats = {success: false, data: null, message: null};

      try {
      AES_KEY = Buffer.from(AES_KEY, "utf-8");
      const decoded = jwt.verify(token, AES_KEY);
      const iv = Buffer.from(decoded.iv.data);
      const encryptedData = decoded.encryptedData;
      const decipher = crypto.createDecipheriv('aes-128-cbc', AES_KEY, iv);
      let decryptedData = decipher.update(encryptedData, 'base64', 'utf-8');
      decryptedData += decipher.final('utf-8');
      stats.success = true;
      stats.data = JSON.parse(decryptedData);
      } catch (err) {
      console.error('Decryption failed:', err);
      return null;
    }
    return stats;
}

module.exports = {decryptUsingSymmetricKey};
