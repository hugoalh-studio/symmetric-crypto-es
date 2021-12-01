const advancedDetermine = require("@hugoalh/advanced-determine");
/**
 * @private
 * @function $check
 * @param {any} data
 * @param {any} passphrase
 * @returns {void}
 */
function $check(data, passphrase) {
	if (!advancedDetermine.isString(data, { empty: false })) {
		throw new TypeError(`Argument \`data\` must be type of string (non-empty)!`);
	};
	if (!advancedDetermine.isString(passphrase, { ascii: true, minimumLength: 4 })) {
		throw new TypeError(`Argument \`passphrase\` must be type of string (ASCII) and at least 4 characters!`);
	};
};
module.exports = $check;
