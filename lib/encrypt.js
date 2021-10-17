const $check = require("./internal/check.js");
const $crypto = require("./internal/crypto.js");
/**
 * @function encrypt
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @returns {string} An encrypted data.
 */
function encrypt(data, passphrase) {
	$check(data, passphrase);
	return $crypto.encrypt(data, $crypto.hashDigest(passphrase));
};
module.exports = encrypt;
