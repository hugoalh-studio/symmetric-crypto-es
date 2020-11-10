/*==================
[NodeJS] Symmetric Crypto - Decrypt
	Language:
		NodeJS/10.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	crypto = require("crypto"),
	hash = require("./hash.js");
/**
 * @function decrypt
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} key Key that need to decrypt data.
 * @returns {string} A decrypted data.
 */
function decrypt(data, key) {
	if (advancedDetermine.isString(data) !== true) {
		throw new TypeError(`Argument "data" must be type of string (non-nullable)! ([NodeJS] Symmetric Crypto - Decrypt)`);
	};
	if (advancedDetermine.isString(key) !== true || key.length < 8) {
		throw new TypeError(`Argument "key" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] Symmetric Crypto - Decrypt)`);
	};
	let encrypted = Buffer.from(data, "base64");
	let decipher = crypto.createDecipheriv("AES-256-CBC", hash(key).slice(0, 32), encrypted.slice(0, 16));
	let decrypted = (Buffer.concat([decipher.update(encrypted.slice(16)), decipher.final()])).toString();
	return decrypted.substr(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
};
module.exports = decrypt;
