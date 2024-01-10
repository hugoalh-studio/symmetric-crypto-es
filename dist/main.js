import { createCipheriv as cryptoCreateCipheriv, createDecipheriv as cryptoCreateDecipheriv, createHash as cryptoCreateHash, randomBytes } from "node:crypto";
/**
 * @access private
 * @param {string} data
 * @returns {void}
 */
function checkData(data) {
    if (!(data.length > 0)) {
        throw new TypeError(`Argument \`data\` is not a string (non-empty)!`);
    }
}
/**
 * @access private
 * @param {number} times
 * @returns {void}
 */
function checkTimes(times) {
    if (!(Number.isSafeInteger(times) && times >= 1)) {
        throw new RangeError(`Argument \`times\` is not a number which is integer, safe, and >= 1!`);
    }
}
/**
 * A password based cryptor.
 */
export class SymmetricCryptor {
    #passphraseStorage;
    /**
     * @param {string} passphrase Passphrase that need to crypto data.
     */
    constructor(passphrase) {
        if (!(passphrase.length >= 4)) {
            throw new Error(`Argument \`passphrase\` is not a string which is at least 4 characters!`);
        }
        this.#passphraseStorage = cryptoCreateHash("sha256").update(passphrase).digest().subarray(0, 32);
    }
    /**
     * @param {string} data
     * @returns {string}
     */
    #decryptor(data) {
        const encrypted = Buffer.from(data, "base64");
        const decipher = cryptoCreateDecipheriv("AES-256-CBC", this.#passphraseStorage, encrypted.subarray(0, 16));
        const decrypted = Buffer.concat([decipher.update(encrypted.subarray(16)), decipher.final()]).toString();
        return decrypted.substring(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
    }
    /**
     * @param {string} data
     * @returns {string}
     */
    #encryptor(data) {
        const iv = randomBytes(16);
        const tone = 16 - data.length % 16;
        const cipher = cryptoCreateCipheriv("AES-256-CBC", this.#passphraseStorage, iv);
        return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
    }
    /**
     * Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    decrypt(data, times = 1) {
        checkData(data);
        checkTimes(times);
        let result = data;
        for (let index = 0; index < times; index++) {
            result = this.#decryptor(result);
        }
        return result;
    }
    /**
     * Decrypt data in multiple line mode.
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
                    return ((itemN.length === 0) ? "" : this.#decryptor(itemN));
                }).join("\n");
            }).join("\r\n");
        }
        return result;
    }
    /**
     * Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    encrypt(data, times = 1) {
        checkData(data);
        checkTimes(times);
        let result = data;
        for (let index = 0; index < times; index++) {
            result = this.#encryptor(result);
        }
        return result;
    }
    /**
     * Encrypt data in multiple line mode.
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
                    return ((itemN.length === 0) ? "" : this.#encryptor(itemN));
                }).join("\n");
            }).join("\r\n");
        }
        return result;
    }
    /** @alias decryptMultipleLine */ decryptML = this.decryptMultipleLine;
    /** @alias decryptMultipleLine */ decryptMultiLine = this.decryptMultipleLine;
    /** @alias encryptMultipleLine */ encryptML = this.encryptMultipleLine;
    /** @alias encryptMultipleLine */ encryptMultiLine = this.encryptMultipleLine;
    /**
     * Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {string} passphrase Passphrase that need to decrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    static decrypt(data, passphrase, times = 1) {
        return new this(passphrase).decrypt(data, times);
    }
    /**
     * Decrypt data in multiple line mode.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {string} passphrase Passphrase that need to decrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    static decryptMultipleLine(data, passphrase, times = 1) {
        return new this(passphrase).decryptMultipleLine(data, times);
    }
    /**
     * Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {string} passphrase Passphrase that need to encrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    static encrypt(data, passphrase, times = 1) {
        return new this(passphrase).encrypt(data, times);
    }
    /**
     * Encrypt data in multiple line mode.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {string} passphrase Passphrase that need to encrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    static encryptMultipleLine(data, passphrase, times = 1) {
        return new this(passphrase).encryptMultipleLine(data, times);
    }
    /** @alias decryptMultipleLine */ static decryptML = this.decryptMultipleLine;
    /** @alias decryptMultipleLine */ static decryptMultiLine = this.decryptMultipleLine;
    /** @alias encryptMultipleLine */ static encryptML = this.encryptMultipleLine;
    /** @alias encryptMultipleLine */ static encryptMultiLine = this.encryptMultipleLine;
}
export default SymmetricCryptor;
/**
 * Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
export function decrypt(data, passphrase, times = 1) {
    return new SymmetricCryptor(passphrase).decrypt(data, times);
}
/**
 * Decrypt data in multiple line mode.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
export function decryptMultipleLine(data, passphrase, times = 1) {
    return new SymmetricCryptor(passphrase).decryptMultipleLine(data, times);
}
export { decryptMultipleLine as decryptML, decryptMultipleLine as decryptMultiLine };
/**
 * Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
export function encrypt(data, passphrase, times = 1) {
    return new SymmetricCryptor(passphrase).encrypt(data, times);
}
/**
 * Encrypt data in multiple line mode.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
export function encryptMultipleLine(data, passphrase, times = 1) {
    return new SymmetricCryptor(passphrase).encryptMultipleLine(data, times);
}
export { encryptMultipleLine as encryptML, encryptMultipleLine as encryptMultiLine };
