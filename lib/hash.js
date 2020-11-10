/*==================
[NodeJS] Symmetric Crypto - Hash
	Language:
		NodeJS/10.13.0
==================*/
const crypto = require("crypto");
/**
 * @private
 * @function hash
 * @param {string} key
 * @returns {Buffer}
 */
function hash(key) {
	return crypto.createHash("sha256").update(key).digest();
};
module.exports = hash;
