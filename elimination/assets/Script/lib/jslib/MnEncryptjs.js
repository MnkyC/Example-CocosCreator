
var encrypt = require("encryptjs");

const MnEncryptjs = {};
MnEncryptjs.encrypt = encrypt.encrypt;
MnEncryptjs.decrypt = encrypt.decrypt;

module.exports = MnEncryptjs;