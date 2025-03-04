const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// aes-128-cbc hs256

let AES_KEY = "0123456789abcdef"; // 128-bit key (16 bytes)
AES_KEY = Buffer.from(AES_KEY, "utf-8");

console.log("AES_KEY", AES_KEY)

// Encrypt function (AES-128-CBC)
function encrypt(jsonObject) {
    const dataToEncrypt = JSON.stringify(jsonObject);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-128-cbc',AES_KEY, iv);
    let encryptedData = cipher.update(dataToEncrypt, 'utf-8', 'base64');
    encryptedData += cipher.final('base64');
    const token = jwt.sign({ iv, encryptedData }, AES_KEY, { algorithm: 'HS256' });
    console.log('Encrypted Token:', token);
    console.log('encryptedData:', encryptedData);
    return token;
}

function decrypt(token) {
    try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, AES_KEY);
    // Convert iv from base64 to Buffer
    const iv = Buffer.from(decoded.iv.data);
    const encryptedData = decoded.encryptedData;
    
    // Create the decipher object
    const decipher = crypto.createDecipheriv('aes-128-cbc', AES_KEY, iv);
    let decryptedData = decipher.update(encryptedData, 'base64', 'utf-8');
    decryptedData += decipher.final('utf-8');
    
    return decryptedData;
    } catch (err) {
    console.error('Decryption failed:', err);
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
    "sid": "sida1",
    "status": "SUCCESS"
};

// Encrypt and sign
const encryptedText = encrypt(jsonData);

// Decrypt and verify
const decryptedData = decrypt(encryptedText);

console.log("Original JSON:", jsonData);
console.log("Encrypted:", encryptedText);
console.log("Decrypted JSON:", decryptedData);


// sample token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpdiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzE5MiwzMCw5OCw0NSwyNTMsMTg0LDEwMywxOTAsMTgxLDE4Myw5MCwxMTgsMTgzLDEzNiw1OCwyMzFdfSwiZW5jcnlwdGVkRGF0YSI6IjVrRjNhdndRdWwzZUVoOWdsYU1wNDNCZjlxbGJIQTRmc1JGQkpJR1JwKzhSNFNqZE5RZUhudjZ2TFRQTFRIOUNROFBrVFF1TytlTHRPRkpyNnBaZ1pVOUNNZC9oWUx0SGJiRU1GcFE3ajZTRzJGbEZtSXQ3NzRidGlsajhHS2hDUllWelhKb2JJL3FtcG5ObUdjN1IxRm5UVS9pc3NCdzdUaU1uTGRJS2xpZXRoMmhEZjN5bFlLaXJlTUNBV0NBVCszUjUwNFV0TXdBRmYzcm1xakFTck9KdGhKZUVqQU9pbXRwMEJBUkhlVkZlUlp6dDBTbGN1Nk9ERUhzS3hYbTZzakJmSFdBMysyZWFXdExwVWNuTTJYQUVrRUhVbGVQclFQVDV5c1ZNYU5iYkJBd1EwQ0RXQlQrS3dYS0hhb21qd3NiQ0IyVmFzeVlkQUZ4NEtTbkxZSUo5ck1uQitKSXBxY21XWllSVXk3TT0iLCJpYXQiOjE3NDEwNTY5NjR9.XhSqrDSNkYJoiqHgq9eemqrLHh2YVgPOq5HBh9YQ0C4