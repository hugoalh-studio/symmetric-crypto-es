/*==================
[NodeJS] Symmetric Crypto - Hash
	Language:
		NodeJS/10.13.0
==================*/
const crypto = require("crypto");
/**
 * @private
 * @function hash
 * @param {string} password
 * @returns {Buffer}
 */
function hash(password) {
	return crypto.createHash("sha256").update(password).digest();
};
module.exports = hash;
