const crypto = require("crypto");
/**
 * @private
 * @function hash
 * @param {string} passphrase
 * @returns {Buffer}
 */
function hash(passphrase) {
	return crypto.createHash("sha256").update(passphrase).digest();
};
/**
 * @private
 * @function decrypt
 * @param {string} data
 * @param {string} passphrase
 * @returns {string}
 */
function decrypt(data, passphrase) {
	let encrypted = Buffer.from(data, "base64");
	let decipher = crypto.createDecipheriv("AES-256-CBC", hash(passphrase).slice(0, 32), encrypted.slice(0, 16));
	let decrypted = (Buffer.concat([decipher.update(encrypted.slice(16)), decipher.final()])).toString();
	return decrypted.substr(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
};
/**
 * @private
 * @function encrypt
 * @param {string} data
 * @param {string} passphrase
 * @returns {string}
 */
function encrypt(data, passphrase) {
	let iv = crypto.randomBytes(16),
		tone = 16 - (data.length % 16);
	let cipher = crypto.createCipheriv("AES-256-CBC", hash(passphrase).slice(0, 32), iv);
	return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
};
module.exports = {
	decrypt,
	encrypt
};
