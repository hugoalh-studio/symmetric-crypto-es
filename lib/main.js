const version = 1;
const decryptMultipleLine = require("./decryptmultipleline.js"),
	encryptMultipleLine = require("./encryptmultipleline.js");
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
