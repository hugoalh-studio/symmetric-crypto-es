import { Cipher, createCipheriv as cryptoCreateCipheriv, createDecipheriv as cryptoCreateDecipheriv, createHash as cryptoCreateHash, Decipher, randomBytes as cryptoRandomBytes } from "node:crypto";
import { NumberItemFilter, StringItemFilter } from "@hugoalh/advanced-determine";
const numberTimesFilter = new NumberItemFilter({
	integer: true,
	minimum: 1,
	safe: true
});
const passphraseFilter = new StringItemFilter({ minimumLength: 4 });
const stringFilter = new StringItemFilter();
/**
 * @access private
 * @function $checkData
 * @param {string} data
 * @returns {void}
 */
function $checkData(data: string): void {
	if (!stringFilter.test(data)) {
		throw new TypeError(`Argument \`data\` must be type of string (non-empty)!`);
	}
}
/**
 * @access private
 * @function $checkTimes
 * @param {number} times
 * @returns {void}
 */
function $checkTimes(times: number): void {
	if (!numberTimesFilter.test(times)) {
		throw new TypeError(`Argument \`times\` must be type of number (integer and safe) and > 0!`);
	}
}
/**
 * @access private
 * @function $decrypt
 * @param {string} data
 * @param {Buffer} hash
 * @returns {string}
 */
function $decrypt(data: string, hash: Buffer): string {
	let encrypted: Buffer = Buffer.from(data, "base64");
	let decipher: Decipher = cryptoCreateDecipheriv("AES-256-CBC", hash, encrypted.subarray(0, 16));
	let decrypted: string = Buffer.concat([decipher.update(encrypted.subarray(16)), decipher.final()]).toString();
	return decrypted.substring(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
}
/**
 * @access private
 * @function $encrypt
 * @param {string} data
 * @param {Buffer} hash
 * @returns {string}
 */
function $encrypt(data: string, hash: Buffer): string {
	let iv: Buffer = cryptoRandomBytes(16);
	let tone: number = 16 - data.length % 16;
	let cipher: Cipher = cryptoCreateCipheriv("AES-256-CBC", hash, iv);
	return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
}
/**
 * @class SymmetricCryptor
 * @description A password based cryptor.
 */
class SymmetricCryptor {
	#passphraseStorage: Buffer;
	/**
	 * @constructor
	 * @param {string} passphrase Passphrase that need to crypto data.
	 */
	constructor(passphrase: string) {
		if (!passphraseFilter.test(passphrase)) {
			throw new TypeError(`Argument \`passphrase\` must be type of string and at least 4 characters!`);
		}
		this.#passphraseStorage = cryptoCreateHash("sha256").update(passphrase).digest().subarray(0, 32);
	}
	/**
	 * @method decrypt
	 * @description Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} A decrypted data.
	 */
	decrypt(data: string, times = 1): string {
		$checkData(data);
		$checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = $decrypt(result, this.#passphraseStorage);
		}
		return result;
	}
	/**
	 * @static decrypt
	 * @description Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @param {string} passphrase Passphrase that need to decrypt data.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} A decrypted data.
	 */
	static decrypt(data: string, passphrase: string, times = 1): string {
		return new this(passphrase).decrypt(data, times);
	}
	/**
	 * @method decryptMultipleLine
	 * @alias decryptML
	 * @alias decryptMultiLine
	 * @description Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} A decrypted data.
	 */
	decryptMultipleLine(data: string, times = 1): string {
		$checkData(data);
		$checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = result.split("\r\n").map((itemRN: string): string => {
				return itemRN.split("\n").map((itemN: string): string => {
					return ((itemN.length === 0) ? "" : $decrypt(itemN, this.#passphraseStorage));
				}).join("\n");
			}).join("\r\n");
		}
		return result;
	}
	decryptML = this.decryptMultipleLine;
	decryptMultiLine = this.decryptMultipleLine;
	/**
	 * @static decryptMultipleLine
	 * @alias decryptML
	 * @alias decryptMultiLine
	 * @description Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @param {string} passphrase Passphrase that need to decrypt data.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} A decrypted data.
	 */
	static decryptMultipleLine(data: string, passphrase: string, times = 1): string {
		return new this(passphrase).decryptMultipleLine(data, times);
	}
	static decryptML = this.decryptMultipleLine;
	static decryptMultiLine = this.decryptMultipleLine;
	/**
	 * @method encrypt
	 * @description Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} An encrypted data.
	 */
	encrypt(data: string, times = 1): string {
		$checkData(data);
		$checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = $encrypt(result, this.#passphraseStorage);
		}
		return result;
	}
	/**
	 * @static encrypt
	 * @description Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @param {string} passphrase Passphrase that need to encrypt data.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} An encrypted data.
	 */
	static encrypt(data: string, passphrase: string, times = 1): string {
		return new this(passphrase).encrypt(data, times);
	}
	/**
	 * @method encryptMultipleLine
	 * @alias encryptML
	 * @alias encryptMultiLine
	 * @description Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} An encrypted data.
	 */
	encryptMultipleLine(data: string, times = 1): string {
		$checkData(data);
		$checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = result.split("\r\n").map((itemRN: string): string => {
				return itemRN.split("\n").map((itemN: string): string => {
					return ((itemN.length === 0) ? "" : $encrypt(itemN, this.#passphraseStorage));
				}).join("\n");
			}).join("\r\n");
		}
		return result;
	}
	encryptML = this.encryptMultipleLine;
	encryptMultiLine = this.encryptMultipleLine;
	/**
	 * @static encryptMultipleLine
	 * @alias encryptML
	 * @alias encryptMultiLine
	 * @description Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @param {string} passphrase Passphrase that need to encrypt data.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} An encrypted data.
	 */
	static encryptMultipleLine(data: string, passphrase: string, times = 1): string {
		return new this(passphrase).encryptMultipleLine(data, times);
	}
	static encryptML = this.encryptMultipleLine;
	static encryptMultiLine = this.encryptMultipleLine;
}
export default SymmetricCryptor;
