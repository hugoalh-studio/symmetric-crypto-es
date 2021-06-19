const check = require("./internal/check.js"),
	internalCrypto = require("./internal/crypto.js");
/**
 * @function decrypt
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @returns {string} A decrypted data.
 */
function decrypt(data, passphrase) {
	check(data, passphrase);
	return internalCrypto.decrypt(data.replace(/\r\n/gu, "\n").replace(/\r/gu, "\n"), passphrase);
};
module.exports = decrypt;
