const decryptMultipleLine = require("./decrypt-multiple-line.js");
const encryptMultipleLine = require("./encrypt-multiple-line.js");
const version = 2;
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
