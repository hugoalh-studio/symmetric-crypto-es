const $check = require("./internal/check.js");
const $crypto = require("./internal/crypto.js");
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
	$check(data, passphrase);
	let hash = $crypto.hashDigest(passphrase);
	return data.split("\r\n").map((itemRN) => {
		return itemRN.split("\n").map((itemN) => {
			return ((itemN.length === 0) ? "" : $crypto.decrypt(itemN, hash));
		}).join("\n");
	}).join("\r\n");
};
module.exports = decryptMultipleLine;
