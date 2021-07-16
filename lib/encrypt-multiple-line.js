const check = require("./internal/check.js"),
	internalCrypto = require("./internal/crypto.js");
/**
 * @function encryptMultipleLine
 * @alias encryptML
 * @alias encryptMultiLine
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @returns {string} A encrypted data.
 */
function encryptMultipleLine(data, passphrase) {
	check(data, passphrase);
	let resultObject = {};
	Promise.allSettled(
		data.replace(/\r\n?/giu, "\n").split("\n").map((item, index) => {
			new Promise(() => {
				resultObject[index] = internalCrypto.encrypt(item, passphrase);
			}).catch();
		})
	);
	return Object.values(resultObject).join("\n");
};
module.exports = encryptMultipleLine;
