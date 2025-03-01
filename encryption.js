const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// aes-128-cbc hs256

const AES_KEY = crypto.randomBytes(16); // 128-bit key (16 bytes)
const IV = crypto.randomBytes(16); // 16-byte IV for CBC mode
const JWT_SECRET = "your_jwt_secret_key"; // HS256 secret key

// Encrypt function (AES-128-CBC)
function encrypt(jsonObject) {
    const text = JSON.stringify(jsonObject);
    const cipher = crypto.createCipheriv('aes-128-cbc', AES_KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decrypt function (AES-128-CBC)
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', AES_KEY, IV);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted); // Convert back to JSON
}

// Sign encrypted data (HS256)
function signData(encryptedText) {
    return jwt.sign({ data: encryptedText }, JWT_SECRET, { algorithm: 'HS256' });
}

// Verify signature (HS256)
function verifySignature(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
}

// Sample JSON input
const jsonData = {
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

// Encrypt and sign
const encryptedText = encrypt(jsonData);
const signedToken = signData(encryptedText);

// Decrypt and verify
const decryptedData = decrypt(encryptedText);
const verifiedData = verifySignature(signedToken);

console.log("Original JSON:", jsonData);
console.log("Encrypted:", encryptedText);
console.log("Decrypted JSON:", decryptedData);
console.log("Signed Token:", signedToken);
console.log("Verified Data:", verifiedData);
