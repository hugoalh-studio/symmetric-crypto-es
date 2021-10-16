import { isString as adIsString } from "@hugoalh/advanced-determine";
/**
 * @private
 * @function $check
 * @param {any} data
 * @param {any} passphrase
 * @returns {void}
 */
function $check(data, passphrase) {
	if (adIsString(data) !== true) {
		throw new TypeError(`Argument \`data\` must be type of string (non-nullable)!`);
	};
	if (
		adIsString(passphrase, { allowNonASCIICharacter: false }) !== true ||
		passphrase.length < 4
	) {
		throw new TypeError(`Argument \`passphrase\` must be type of string (ASCII and non-nullable) and at least 4 characters!`);
	};
};
export default $check;
