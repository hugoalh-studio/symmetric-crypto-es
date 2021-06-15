const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalCore = require("./internal/core.js");
/**
 * @function decrypt
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} key Key that need to decrypt data.
 * @returns {string} A decrypted data.
 */
function decrypt(data, key) {
	if (advancedDetermine.isString(data) !== true) {
		throw new TypeError(`Argument "data" must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isString(key) !== true || key.length < 8) {
		throw new TypeError(`Argument "key" must be type of string (non-nullable) and at least 8 characters!`);
	};
	return internalCore.decrypt(data.replace(/\r\n/gu, "\n").replace(/\r/gu, "\n"), key);
};
module.exports = decrypt;
