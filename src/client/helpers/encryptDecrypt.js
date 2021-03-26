import rsa from 'js-crypto-rsa';
let encoder = new TextEncoder();
let decoder = new TextDecoder();

export function encryptMessage(message, publicKey) {
    return new Promise((resolve, reject) => {
        rsa.encrypt(
            encoder.encode(message),
            publicKey,
            'SHA-256', // optional, for OAEP. default is 'SHA-256'
        ).then((encrypted) => {
            resolve(encrypted);
        }).catch(error => {
            console.error(error);
            reject();
        })
    })
}

export function decryptMessage(encryptedMessage, privateKey) {
    return new Promise((resolve, reject) => {
        rsa.decrypt(
            encryptedMessage,
            privateKey,
            'SHA-256', // optional, for OAEP. default is 'SHA-256'
        ).then((decrypted) => {
            resolve(decoder.decode(decrypted));
        }).catch(error => {
            console.error(error);
            reject();
        })
    })
}