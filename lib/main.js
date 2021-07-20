const version = 2;
const decryptMultipleLine = require("./decrypt-multiple-line.js"),
	encryptMultipleLine = require("./encrypt-multiple-line.js");
module.exports = {
	decrypt: require("./decrypt.js"),
	decryptML: decryptMultipleLine,
	decryptMultiLine: decryptMultipleLine,
	decryptMultipleLine: decryptMultipleLine,
	encrypt: require("./encrypt.js"),
	encryptML: encryptMultipleLine,
	encryptMultiLine: encryptMultipleLine,
	encryptMultipleLine: encryptMultipleLine,
	v: version,
	ver: version,
	version: version
};
