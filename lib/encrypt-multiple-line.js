const $check = require("./internal/check.js");
const $crypto = require("./internal/crypto.js");
/**
 * @function encryptMultipleLine
 * @alias encryptML
 * @alias encryptMultiLine
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @returns {string} An encrypted data.
 */
function encryptMultipleLine(data, passphrase) {
	$check(data, passphrase);
	let hash = $crypto.hashDigest(passphrase);
	return data.split("\r\n").map((itemRN) => {
		return itemRN.split("\n").map((itemN) => {
			return ((itemN.length === 0) ? "" : $crypto.encrypt(itemN, hash));
		}).join("\n");
	}).join("\r\n");
};
module.exports = encryptMultipleLine;
