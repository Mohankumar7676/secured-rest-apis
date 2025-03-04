'use strict';

const {StatusCodes, ReasonPhrases} = require('http-status-codes');

const gConst = require('../../constants/globalConstants');
const {decryptUsingSymmetricKey} = require('../../auth/authenticationHandler');
const extraParams = {
  ...gConst
}

/**
 *
 * @param {Object} request
 * @param {Object} response
 */
async function processQRCallback(request, response) {
  try {
    const encryptData = request.body.body.encryptData;
    const decryptedDatas = await decryptUsingSymmetricKey(encryptData,extraParams.symmetricKey);
    const decryptedData = decryptedDatas.data;
    const mappedData = {
      mid: decryptedData.mid,
      channel: decryptedData.channel,
      accountNumber: decryptedData.account_number,
      mobileNumber: decryptedData.mobile_number,
      terminalId: decryptedData.terminalId,
      name: decryptedData.name,
      bankName: decryptedData.bank_name,
      mcc: decryptedData.mcc,
      ifscCode: decryptedData.ifsc_code,
      checksum: decryptedData.checksum,
      additionalNo: decryptedData.additionalNo,
      sid: decryptedData.sid
    };
    if(mappedData.status === "SUCCESS") {
     return response.status(StatusCodes.OK).json(mappedData);
    }
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  } catch (error) {

  }
}

module.exports = {processQRCallback};
