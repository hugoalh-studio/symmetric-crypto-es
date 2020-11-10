/*==================
[NodeJS] Symmetric Crypto - Encrypt
	Language:
		NodeJS/10.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	crypto = require("crypto"),
	hash = require("./hash.js");
/**
 * @function encrypt
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
	let iv = crypto.randomBytes(16),
		tone = 16 - (data.length % 16);
	let cipher = crypto.createCipheriv("AES-256-CBC", hash(key).slice(0, 32), iv);
	return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
};
module.exports = encrypt;
