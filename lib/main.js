const decrypt = require("./decrypt.js");
const decryptMultipleLine = require("./decrypt-multiple-line.js");
const encrypt = require("./encrypt.js");
const encryptMultipleLine = require("./encrypt-multiple-line.js");
const SymmetricCryptor = require("./symmetric-cryptor.js");
const version = 2;
module.exports = {
	decrypt,
	decryptML: decryptMultipleLine,
	decryptMultiLine: decryptMultipleLine,
	decryptMultipleLine,
	encrypt,
	encryptML: encryptMultipleLine,
	encryptMultiLine: encryptMultipleLine,
	encryptMultipleLine,
	SymmetricCryptor,
	v: version,
	ver: version,
	version
};
