const advancedDetermine = require("@hugoalh/advanced-determine"),
	internalCore = require("./internal/core.js");
/**
 * @function decryptMultipleLine
 * @alias decryptML
 * @alias decryptMultiLine
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} key Key that need to decrypt data.
 * @returns {string} A decrypted data.
 */
function decryptMultipleLine(data, key) {
	if (advancedDetermine.isString(data) !== true) {
		throw new TypeError(`Argument "data" must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isString(key) !== true || key.length < 8) {
		throw new TypeError(`Argument "key" must be type of string (non-nullable) and at least 8 characters!`);
	};
	let resultObject = {};
	Promise.allSettled(
		data.replace(/\r\n/gu, "\n").replace(/\r/gu, "\n").split("\n").map((item, index) => {
			new Promise(() => {
				resultObject[index] = internalCore.decrypt(item, key);
			}).catch();
		})
	);
	return Object.values(resultObject).join("\n");
};
module.exports = decryptMultipleLine;
