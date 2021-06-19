const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @private
 * @function check
 * @param {*} data
 * @param {*} passphrase
 * @returns {void}
 */
function check(data, passphrase) {
	if (advancedDetermine.isString(data) !== true) {
		throw new TypeError(`Argument "data" must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isString(passphrase) !== true || passphrase.length < 8) {
		throw new TypeError(`Argument "passphrase" must be type of string (non-nullable) and at least 8 characters!`);
	};
};
module.exports = check;
