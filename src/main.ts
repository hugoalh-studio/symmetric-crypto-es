import { Cipher, createCipheriv as cryptoCreateCipheriv, createDecipheriv as cryptoCreateDecipheriv, createHash as cryptoCreateHash, Decipher, randomBytes } from "node:crypto";
import { NumberItemFilter, StringItemFilter } from "@hugoalh/advanced-determine";
const dataFilter = new StringItemFilter();
const passphraseFilter = new StringItemFilter({ lengthMinimum: 4 });
const timesFilter = new NumberItemFilter({
	integer: true,
	minimum: 1,
	safe: true
});
/**
 * @access private
 * @function checkData
 * @param {string} data
 * @returns {void}
 */
function checkData(data: string): void {
	if (!dataFilter.test(data)) {
		throw new TypeError(`Argument \`data\` must be type of string (non-empty)!`);
	}
}
/**
 * @access private
 * @function checkTimes
 * @param {number} times
 * @returns {void}
 */
function checkTimes(times: number): void {
	if (!timesFilter.test(times)) {
		throw new TypeError(`Argument \`times\` must be type of number (integer and safe) and > 0!`);
	}
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
	 * @method #decrypt
	 * @param {string} data
	 * @returns {string}
	 */
	#decrypt(data: string): string {
		let encrypted: Buffer = Buffer.from(data, "base64");
		let decipher: Decipher = cryptoCreateDecipheriv("AES-256-CBC", this.#passphraseStorage, encrypted.subarray(0, 16));
		let decrypted: string = Buffer.concat([decipher.update(encrypted.subarray(16)), decipher.final()]).toString();
		return decrypted.substring(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
	}
	/**
	 * @method #encrypt
	 * @param {string} data
	 * @returns {string}
	 */
	#encrypt(data: string): string {
		let iv: Buffer = randomBytes(16);
		let tone: number = 16 - data.length % 16;
		let cipher: Cipher = cryptoCreateCipheriv("AES-256-CBC", this.#passphraseStorage, iv);
		return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
	}
	/**
	 * @method decrypt
	 * @description Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} A decrypted data.
	 */
	decrypt(data: string, times = 1): string {
		checkData(data);
		checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = this.#decrypt(result);
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
	 * @description Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} A decrypted data.
	 */
	decryptMultipleLine(data: string, times = 1): string {
		checkData(data);
		checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = result.split("\r\n").map((itemRN: string): string => {
				return itemRN.split("\n").map((itemN: string): string => {
					return ((itemN.length === 0) ? "" : this.#decrypt(itemN));
				}).join("\n");
			}).join("\r\n");
		}
		return result;
	}
	/**
	 * @static decryptMultipleLine
	 * @description Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @param {string} passphrase Passphrase that need to decrypt data.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} A decrypted data.
	 */
	static decryptMultipleLine(data: string, passphrase: string, times = 1): string {
		return new this(passphrase).decryptMultipleLine(data, times);
	}
	/**
	 * @method encrypt
	 * @description Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} An encrypted data.
	 */
	encrypt(data: string, times = 1): string {
		checkData(data);
		checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = this.#encrypt(result);
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
	 * @description Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} An encrypted data.
	 */
	encryptMultipleLine(data: string, times = 1): string {
		checkData(data);
		checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = result.split("\r\n").map((itemRN: string): string => {
				return itemRN.split("\n").map((itemN: string): string => {
					return ((itemN.length === 0) ? "" : this.#encrypt(itemN));
				}).join("\n");
			}).join("\r\n");
		}
		return result;
	}
	/**
	 * @static encryptMultipleLine
	 * @description Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @param {string} passphrase Passphrase that need to encrypt data.
	 * @param {number} [times=1] Crypto rotation.
	 * @returns {string} An encrypted data.
	 */
	static encryptMultipleLine(data: string, passphrase: string, times = 1): string {
		return new this(passphrase).encryptMultipleLine(data, times);
	}
	/** @alias decryptMultipleLine */decryptML = this.decryptMultipleLine;
	/** @alias decryptMultipleLine */decryptMultiLine = this.decryptMultipleLine;
	/** @alias decryptMultipleLine */static decryptML = this.decryptMultipleLine;
	/** @alias decryptMultipleLine */static decryptMultiLine = this.decryptMultipleLine;
	/** @alias encryptMultipleLine */encryptML = this.encryptMultipleLine;
	/** @alias encryptMultipleLine */encryptMultiLine = this.encryptMultipleLine;
	/** @alias encryptMultipleLine */static encryptML = this.encryptMultipleLine;
	/** @alias encryptMultipleLine */static encryptMultiLine = this.encryptMultipleLine;
}
/**
 * @function decrypt
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
function decrypt(data: string, passphrase: string, times = 1): string {
	return new SymmetricCryptor(passphrase).decrypt(data, times);
}
/**
 * @function decryptMultipleLine
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
function decryptMultipleLine(data: string, passphrase: string, times = 1): string {
	return new SymmetricCryptor(passphrase).decryptMultipleLine(data, times);
}
/**
 * @function encrypt
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
function encrypt(data: string, passphrase: string, times = 1): string {
	return new SymmetricCryptor(passphrase).encrypt(data, times);
}
/**
 * @function encryptMultipleLine
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
function encryptMultipleLine(data: string, passphrase: string, times = 1): string {
	return new SymmetricCryptor(passphrase).encryptMultipleLine(data, times);
}
export {
	decrypt,
	decryptMultipleLine,
	decryptMultipleLine as decryptML,
	decryptMultipleLine as decryptMultiLine,
	encrypt,
	encryptMultipleLine,
	encryptMultipleLine as encryptML,
	encryptMultipleLine as encryptMultiLine,
	SymmetricCryptor
};
export default {
	decrypt,
	decryptML: decryptMultipleLine,
	decryptMultiLine: decryptMultipleLine,
	decryptMultipleLine,
	encrypt,
	encryptML: encryptMultipleLine,
	encryptMultiLine: encryptMultipleLine,
	encryptMultipleLine,
	SymmetricCryptor
};
