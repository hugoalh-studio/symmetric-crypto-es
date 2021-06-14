const version = 1;
const decryptMultipleLine = require("./decryptmultipleline.js"),
	encryptMultipleLine = require("./encryptmultipleline.js");
module.exports = {
	decrypt: require("./decrypt.js"),
	decryptML: decryptMultipleLine,
	decryptMultipleLine: decryptMultipleLine,
	encrypt: require("./encrypt.js"),
	encryptML: encryptMultipleLine,
	encryptMultipleLine: encryptMultipleLine,
	v: version,
	ver: version,
	version: version
};
