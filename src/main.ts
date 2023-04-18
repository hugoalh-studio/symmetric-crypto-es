import { Cipher, createCipheriv as cryptoCreateCipheriv, createDecipheriv as cryptoCreateDecipheriv, createHash as cryptoCreateHash, Decipher, randomBytes } from "node:crypto";
/**
 * @access private
 * @function $checkData
 * @param {string} data
 * @returns {void}
 */
function $checkData(data: string): void {
	if (typeof data !== "string") {
		throw new TypeError(`Argument \`data\` must be type of string!`);
	}
	if (!(data.length > 0)) {
		throw new Error(`Argument \`data\` must be a string which is non-empty!`);
	}
}
/**
 * @access private
 * @function $checkTimes
 * @param {number} times
 * @returns {void}
 */
function $checkTimes(times: number): void {
	if (typeof times !== "number") {
		throw new TypeError(`Argument \`times\` must be type of number!`);
	}
	if (!(Number.isSafeInteger(times) && times >= 1)) {
		throw new RangeError(`Argument \`times\` must be a number which is integer, safe, and >= 1!`);
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
		if (typeof passphrase !== "string") {
			throw new TypeError(`Argument \`passphrase\` must be type of string!`);
		}
		if (!(passphrase.length >= 4)) {
			throw new Error(`Argument \`passphrase\` must be a string which is at least 4 characters!`);
		}
		this.#passphraseStorage = cryptoCreateHash("sha256").update(passphrase).digest().subarray(0, 32);
	}
	/**
	 * @method #decryptor
	 * @param {string} data
	 * @returns {string}
	 */
	#decryptor(data: string): string {
		let encrypted: Buffer = Buffer.from(data, "base64");
		let decipher: Decipher = cryptoCreateDecipheriv("AES-256-CBC", this.#passphraseStorage, encrypted.subarray(0, 16));
		let decrypted: string = Buffer.concat([decipher.update(encrypted.subarray(16)), decipher.final()]).toString();
		return decrypted.substring(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
	}
	/**
	 * @method #encryptor
	 * @param {string} data
	 * @returns {string}
	 */
	#encryptor(data: string): string {
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
		$checkData(data);
		$checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = this.#decryptor(result);
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
		$checkData(data);
		$checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = result.split("\r\n").map((itemRN: string): string => {
				return itemRN.split("\n").map((itemN: string): string => {
					return ((itemN.length === 0) ? "" : this.#decryptor(itemN));
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
		$checkData(data);
		$checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = this.#encryptor(result);
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
		$checkData(data);
		$checkTimes(times);
		let result: string = data;
		for (let index = 0; index < times; index++) {
			result = result.split("\r\n").map((itemRN: string): string => {
				return itemRN.split("\n").map((itemN: string): string => {
					return ((itemN.length === 0) ? "" : this.#encryptor(itemN));
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
