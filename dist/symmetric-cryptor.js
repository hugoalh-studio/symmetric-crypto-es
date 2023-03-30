import { createCipheriv as cryptoCreateCipheriv, createDecipheriv as cryptoCreateDecipheriv, createHash as cryptoCreateHash, randomBytes } from "node:crypto";
import { NumberItemFilter, StringItemFilter } from "@hugoalh/advanced-determine";
const dataFilter = new StringItemFilter();
const passphraseFilter = new StringItemFilter({ minimumLength: 4 });
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
function checkData(data) {
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
function checkTimes(times) {
    if (!timesFilter.test(times)) {
        throw new TypeError(`Argument \`times\` must be type of number (integer and safe) and > 0!`);
    }
}
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
    #decrypt(data) {
        let encrypted = Buffer.from(data, "base64");
        let decipher = cryptoCreateDecipheriv("AES-256-CBC", this.#passphraseStorage, encrypted.subarray(0, 16));
        let decrypted = Buffer.concat([decipher.update(encrypted.subarray(16)), decipher.final()]).toString();
        return decrypted.substring(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
    }
    /**
     * @method #encrypt
     * @param {string} data
     * @returns {string}
     */
    #encrypt(data) {
        let iv = randomBytes(16);
        let tone = 16 - data.length % 16;
        let cipher = cryptoCreateCipheriv("AES-256-CBC", this.#passphraseStorage, iv);
        return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
    }
    /**
     * @method decrypt
     * @description Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    decrypt(data, times = 1) {
        checkData(data);
        checkTimes(times);
        let result = data;
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
    static decrypt(data, passphrase, times = 1) {
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
    decryptMultipleLine(data, times = 1) {
        checkData(data);
        checkTimes(times);
        let result = data;
        for (let index = 0; index < times; index++) {
            result = result.split("\r\n").map((itemRN) => {
                return itemRN.split("\n").map((itemN) => {
                    return ((itemN.length === 0) ? "" : this.#decrypt(itemN));
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
    static decryptMultipleLine(data, passphrase, times = 1) {
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
    encrypt(data, times = 1) {
        checkData(data);
        checkTimes(times);
        let result = data;
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
    static encrypt(data, passphrase, times = 1) {
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
    encryptMultipleLine(data, times = 1) {
        checkData(data);
        checkTimes(times);
        let result = data;
        for (let index = 0; index < times; index++) {
            result = result.split("\r\n").map((itemRN) => {
                return itemRN.split("\n").map((itemN) => {
                    return ((itemN.length === 0) ? "" : this.#encrypt(itemN));
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
    static encryptMultipleLine(data, passphrase, times = 1) {
        return new this(passphrase).encryptMultipleLine(data, times);
    }
    static encryptML = this.encryptMultipleLine;
    static encryptMultiLine = this.encryptMultipleLine;
}
export { SymmetricCryptor };
