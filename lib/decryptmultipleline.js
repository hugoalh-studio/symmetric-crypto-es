/*==================
[NodeJS] Symmetric Crypto - Decrypt Multiple Line
	Language:
		NodeJS/10.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	scCore = require("./core.js");
/**
 * @function decryptMultipleLine
 * @alias decryptML
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} key Key that need to decrypt data.
 * @returns {string} A decrypted data.
 */
function decryptMultipleLine(data, key) {
	if (advancedDetermine.isString(data) !== true) {
		throw new TypeError(`Argument "data" must be type of string (non-nullable)! ([NodeJS] Symmetric Crypto - Decrypt)`);
	};
	if (advancedDetermine.isString(key) !== true || key.length < 8) {
		throw new TypeError(`Argument "key" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] Symmetric Crypto - Decrypt)`);
	};
	let dataSplit = data.replace(/\r\n/gu, "\n").replace(/\r/gu, "\n").split("\n");
	if (Promise.allSettled) {
		let resultObject = {};
		Promise.allSettled(
			dataSplit.map((item, index) => {
				new Promise(() => {
					resultObject[index] = scCore.decrypt(item, key);
				}).catch();
			})
		);
		return Object.values(resultObject).join("\n");
	};
	let resultArray = [];
	dataSplit.forEach((item) => {
		resultArray.push(scCore.decrypt(item, key));
	});
	return resultArray.join("\n");
};
module.exports = decryptMultipleLine;
