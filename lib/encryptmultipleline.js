/*==================
[NodeJS] Symmetric Crypto - Encrypt Multiple Line
	Language:
		NodeJS/10.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	scCore = require("./core.js");
/**
 * @function encryptMultipleLine
 * @alias encryptML
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} key Key that need to encrypt data.
 * @returns {string} A encrypted data.
 */
function encryptMultipleLine(data, key) {
	if (advancedDetermine.isString(data) !== true) {
		throw new TypeError(`Argument "data" must be type of string (non-nullable)! ([NodeJS] Symmetric Crypto - Encrypt)`);
	};
	if (advancedDetermine.isString(key) !== true || key.length < 8) {
		throw new TypeError(`Argument "key" must be type of string (non-nullable) and at least 8 charactars! ([NodeJS] Symmetric Crypto - Encrypt)`);
	};
	let dataSplit = data.replace(/\r\n/gu, "\n").replace(/\r/gu, "\n").split("\n");
	if (Promise.allSettled) {
		let resultObject = {};
		Promise.allSettled(
			dataSplit.map((item, index) => {
				new Promise(() => {
					resultObject[index] = scCore.encrypt(item, key);
				}).catch();
			})
		);
		return Object.values(resultObject).join("\n");
	};
	let resultArray = [];
	dataSplit.forEach((item) => {
		resultArray.push(scCore.encrypt(item, key));
	});
	return resultArray.join("\n");
};
module.exports = encryptMultipleLine;
