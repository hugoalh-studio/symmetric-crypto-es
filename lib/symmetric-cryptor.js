const advancedDetermine = require("@hugoalh/advanced-determine");
const crypto = require("crypto");
/**
 * @private
 * @function $checkData
 * @param {string} data
 * @returns {void}
 */
function $checkData(data) {
	if (!advancedDetermine.isString(data, { empty: false })) {
		throw new TypeError(`Argument \`data\` must be type of string (non-empty)!`);
	};
};
/**
 * @private
 * @function $checkTimes
 * @param {number} times
 * @returns {void}
 */
function $checkTimes(times) {
	if (!advancedDetermine.isNumber(times, {
		integer: true,
		minimum: 1,
		safe: true
	})) {
		throw new TypeError(`Argument \`times\` must be type of number (integer and safe) and greater than 0!`);
	};
};
/**
 * @private
 * @function $decrypt
 * @param {string} data
 * @param {Buffer} hash
 * @returns {string}
 */
function $decrypt(data, hash) {
	let encrypted = Buffer.from(data, "base64");
	let decipher = crypto.createDecipheriv("AES-256-CBC", hash, encrypted.slice(0, 16));
	let decrypted = Buffer.concat([decipher.update(encrypted.slice(16)), decipher.final()]).toString();
	let decryptedLength = decrypted.length;
	return decrypted.substr(0, decryptedLength - decrypted.charCodeAt(decryptedLength - 1));
};
/**
 * @private
 * @function $encrypt
 * @param {string} data
 * @param {Buffer} hash
 * @returns {string}
 */
function $encrypt(data, hash) {
	let dataLength = data.length;
	let iv = crypto.randomBytes(16);
	let tone = 16 - dataLength % 16;
	let cipher = crypto.createCipheriv("AES-256-CBC", hash, iv);
	return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(dataLength + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
};
/**
 * @class SymmetricCryptor
 * @description A password based cryptor.
 */
class SymmetricCryptor {
	#passphraseStorage;
	/**
	 * @constructor
	 * @param {string} passphrase Passphrase that need to crypto data.
	 */
	constructor(passphrase) {
		if (!advancedDetermine.isString(passphrase, { minimumLength: 4 })) {
			throw new TypeError(`Argument \`passphrase\` must be type of string and at least 4 characters!`);
		};
		this.#passphraseStorage = crypto.createHash("sha256").update(passphrase).digest().slice(0, 32);
	};
	/**
	 * @method decrypt
	 * @description Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} A decrypted data.
	 */
	decrypt(data, times = 1) {
		$checkData(data);
		$checkTimes(times);
		let result = data;
		for (let index = 0; index < times; index++) {
			result = $decrypt(result, this.#passphraseStorage);
		};
		return result;
	};
	/**
	 * @method decryptMultipleLine
	 * @description Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} A decrypted data.
	 */
	decryptMultipleLine(data, times = 1) {
		$checkData(data);
		$checkTimes(times);
		let result = data;
		for (let index = 0; index < times; index++) {
			result = result.split("\r\n").map((itemRN) => {
				return itemRN.split("\n").map((itemN) => {
					return ((itemN.length === 0) ? "" : $decrypt(itemN, this.#passphraseStorage));
				}).join("\n");
			}).join("\r\n");
		};
		return result;
	};
	/**
	 * @method encrypt
	 * @description Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} An encrypted data.
	 */
	encrypt(data, times = 1) {
		$checkData(data);
		$checkTimes(times);
		let result = data;
		for (let index = 0; index < times; index++) {
			result = $encrypt(result, this.#passphraseStorage);
		};
		return result;
	};
	/**
	 * @method encryptMultipleLine
	 * @description Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} An encrypted data.
	 */
	encryptMultipleLine(data, times = 1) {
		$checkData(data);
		$checkTimes(times);
		let result = data;
		for (let index = 0; index < times; index++) {
			result = result.split("\r\n").map((itemRN) => {
				return itemRN.split("\n").map((itemN) => {
					return ((itemN.length === 0) ? "" : $encrypt(itemN, this.#passphraseStorage));
				}).join("\n");
			}).join("\r\n");
		};
		return result;
	};
};
module.exports = SymmetricCryptor;
