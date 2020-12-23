/*==================
[NodeJS] Symmetric Crypto - Encrypt
	Language:
		NodeJS/14.15.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	scCore = require("./core.js");
/**
 * @function encrypt
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} key Key that need to encrypt data.
 * @returns {string} A encrypted data.
 */
function encrypt(data, key) {
	if (advancedDetermine.isString(data) !== true) {
		throw new TypeError(`Argument "data" must be type of string (non-nullable)! ([NodeJS] Symmetric Crypto - Encrypt)`);
	};
	if (advancedDetermine.isString(key) !== true || key.length < 8) {
		throw new TypeError(`Argument "key" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] Symmetric Crypto - Encrypt)`);
	};
	data = data.replace(/\r\n/gu, "\n").replace(/\r/gu, "\n");
	return scCore.encrypt(data, key);
};
module.exports = encrypt;
