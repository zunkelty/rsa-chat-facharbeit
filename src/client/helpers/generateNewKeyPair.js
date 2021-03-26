import rsa from 'js-crypto-rsa';

export function generateNewKeyPair() {
    return rsa.generateKey(4096);
}

function arrayBufferToBase64(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    var byteString = '';
    for (var i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCharCode(byteArray[i]);
    }
    var b64 = window.btoa(byteString);
    return b64;
}

function addNewLines(str) {
    var finalString = '';
    while (str.length > 0) {
        finalString += str.substring(0, 64) + '\n';
        str = str.substring(64);
    }
    return finalString;
}

function toPem(privateKey, isPrivate) {
    var b64 = addNewLines(arrayBufferToBase64(privateKey));
    var pem = isPrivate ? ("-----BEGIN PRIVATE KEY-----\n" + b64 + "-----END PRIVATE KEY-----") : ("-----BEGIN PUBLIC KEY-----\n" + b64 + "-----END PUBLIC KEY-----");
    return pem;
}