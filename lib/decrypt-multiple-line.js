const check = require("./internal/check.js"),
	internalCrypto = require("./internal/crypto.js");
/**
 * @function decryptMultipleLine
 * @alias decryptML
 * @alias decryptMultiLine
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @returns {string} A decrypted data.
 */
function decryptMultipleLine(data, passphrase) {
	check(data, passphrase);
	let resultObject = {};
	Promise.allSettled(
		data.replace(/\r\n/gu, "\n").replace(/\r/gu, "\n").split("\n").map((item, index) => {
			new Promise(() => {
				resultObject[index] = internalCrypto.decrypt(item, passphrase);
			}).catch();
		})
	);
	return Object.values(resultObject).join("\n");
};
module.exports = decryptMultipleLine;
