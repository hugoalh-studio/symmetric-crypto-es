import { Cipher, createCipheriv as cryptoCreateCipheriv, createDecipheriv as cryptoCreateDecipheriv, createHash as cryptoCreateHash, Decipher, randomBytes as cryptoRandomBytes } from "node:crypto";
import { NumberItemFilter, StringItemFilter } from "@hugoalh/advanced-determine";
const numberTimesFilter = new NumberItemFilter({
	integer: true,
	minimum: 1,
	safe: true
});
const stringFilter = new StringItemFilter();
/**
 * @private
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
 * @private
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
 * @private
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
 * @private
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
		if (!new StringItemFilter({ minimumLength: 4 }).test(passphrase)) {
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
	 * @method decryptMultipleLine
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
	 * @method encryptMultipleLine
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
}
export default SymmetricCryptor;
