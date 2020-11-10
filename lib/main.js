/*==================
[NodeJS] Symmetric Crypto
	Language:
		NodeJS/10.13.0
==================*/
/**
 * @const {string} version
 */
const version = "1.0.0";

module.exports = {
	decrypt: require("./decrypt.js"),
	encrypt: require("./encrypt.js"),
	v: version,
	ver: version,
	version: version
};
