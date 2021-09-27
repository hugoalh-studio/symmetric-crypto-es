const check = require("./internal/check.js");
const internalCrypto = require("./internal/crypto.js");
/**
 * @function encrypt
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @returns {string} A encrypted data.
 */
function encrypt(data, passphrase) {
	check(data, passphrase);
	return internalCrypto.encrypt(data, internalCrypto.hashDigest(passphrase));
};
module.exports = encrypt;
