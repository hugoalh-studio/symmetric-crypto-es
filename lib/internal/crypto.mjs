import { createCipheriv as cryptoCreateCipheriv, createDecipheriv as cryptoCreateDecipheriv, createHash as cryptoCreateHash, randomBytes as cryptoRandomBytes } from "crypto";
/**
 * @private
 * @function hashDigest
 * @param {string} passphrase
 * @returns {Buffer}
 */
function hashDigest(passphrase) {
	return cryptoCreateHash("sha256").update(passphrase).digest().slice(0, 32);
};
/**
 * @private
 * @function decrypt
 * @param {string} data
 * @param {Buffer} hash
 * @returns {string}
 */
function decrypt(data, hash) {
	let encrypted = Buffer.from(data, "base64");
	let decipher = cryptoCreateDecipheriv("AES-256-CBC", hash, encrypted.slice(0, 16));
	let decrypted = Buffer.concat([decipher.update(encrypted.slice(16)), decipher.final()]).toString();
	return decrypted.substr(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
};
/**
 * @private
 * @function encrypt
 * @param {string} data
 * @param {Buffer} hash
 * @returns {string}
 */
function encrypt(data, hash) {
	let iv = cryptoRandomBytes(16);
	let tone = 16 - (data.length % 16);
	let cipher = cryptoCreateCipheriv("AES-256-CBC", hash, iv);
	return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
};
export {
	decrypt,
	encrypt,
	hashDigest
};
