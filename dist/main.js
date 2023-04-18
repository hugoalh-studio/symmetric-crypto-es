var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SymmetricCryptor_instances, _a, _SymmetricCryptor_passphraseStorage, _SymmetricCryptor_decryptor, _SymmetricCryptor_encryptor;
import { createCipheriv as cryptoCreateCipheriv, createDecipheriv as cryptoCreateDecipheriv, createHash as cryptoCreateHash, randomBytes } from "node:crypto";
/**
 * @access private
 * @function $checkData
 * @param {string} data
 * @returns {void}
 */
function $checkData(data) {
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
function $checkTimes(times) {
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
    /**
     * @constructor
     * @param {string} passphrase Passphrase that need to crypto data.
     */
    constructor(passphrase) {
        _SymmetricCryptor_instances.add(this);
        _SymmetricCryptor_passphraseStorage.set(this, void 0);
        /** @alias decryptMultipleLine */ this.decryptML = this.decryptMultipleLine;
        /** @alias decryptMultipleLine */ this.decryptMultiLine = this.decryptMultipleLine;
        /** @alias encryptMultipleLine */ this.encryptML = this.encryptMultipleLine;
        /** @alias encryptMultipleLine */ this.encryptMultiLine = this.encryptMultipleLine;
        if (typeof passphrase !== "string") {
            throw new TypeError(`Argument \`passphrase\` must be type of string!`);
        }
        if (!(passphrase.length >= 4)) {
            throw new Error(`Argument \`passphrase\` must be a string which is at least 4 characters!`);
        }
        __classPrivateFieldSet(this, _SymmetricCryptor_passphraseStorage, cryptoCreateHash("sha256").update(passphrase).digest().subarray(0, 32), "f");
    }
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
            result = __classPrivateFieldGet(this, _SymmetricCryptor_instances, "m", _SymmetricCryptor_decryptor).call(this, result);
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
                    return ((itemN.length === 0) ? "" : __classPrivateFieldGet(this, _SymmetricCryptor_instances, "m", _SymmetricCryptor_decryptor).call(this, itemN));
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
    static decryptMultipleLine(data, passphrase, times = 1) {
        return new this(passphrase).decryptMultipleLine(data, times);
    }
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
            result = __classPrivateFieldGet(this, _SymmetricCryptor_instances, "m", _SymmetricCryptor_encryptor).call(this, result);
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
                    return ((itemN.length === 0) ? "" : __classPrivateFieldGet(this, _SymmetricCryptor_instances, "m", _SymmetricCryptor_encryptor).call(this, itemN));
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
    static encryptMultipleLine(data, passphrase, times = 1) {
        return new this(passphrase).encryptMultipleLine(data, times);
    }
}
_a = SymmetricCryptor, _SymmetricCryptor_passphraseStorage = new WeakMap(), _SymmetricCryptor_instances = new WeakSet(), _SymmetricCryptor_decryptor = function _SymmetricCryptor_decryptor(data) {
    let encrypted = Buffer.from(data, "base64");
    let decipher = cryptoCreateDecipheriv("AES-256-CBC", __classPrivateFieldGet(this, _SymmetricCryptor_passphraseStorage, "f"), encrypted.subarray(0, 16));
    let decrypted = Buffer.concat([decipher.update(encrypted.subarray(16)), decipher.final()]).toString();
    return decrypted.substring(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
}, _SymmetricCryptor_encryptor = function _SymmetricCryptor_encryptor(data) {
    let iv = randomBytes(16);
    let tone = 16 - data.length % 16;
    let cipher = cryptoCreateCipheriv("AES-256-CBC", __classPrivateFieldGet(this, _SymmetricCryptor_passphraseStorage, "f"), iv);
    return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
};
/** @alias decryptMultipleLine */ SymmetricCryptor.decryptML = _a.decryptMultipleLine;
/** @alias decryptMultipleLine */ SymmetricCryptor.decryptMultiLine = _a.decryptMultipleLine;
/** @alias encryptMultipleLine */ SymmetricCryptor.encryptML = _a.encryptMultipleLine;
/** @alias encryptMultipleLine */ SymmetricCryptor.encryptMultiLine = _a.encryptMultipleLine;
/**
 * @function decrypt
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
function decrypt(data, passphrase, times = 1) {
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
function decryptMultipleLine(data, passphrase, times = 1) {
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
function encrypt(data, passphrase, times = 1) {
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
function encryptMultipleLine(data, passphrase, times = 1) {
    return new SymmetricCryptor(passphrase).encryptMultipleLine(data, times);
}
export { decrypt, decryptMultipleLine, decryptMultipleLine as decryptML, decryptMultipleLine as decryptMultiLine, encrypt, encryptMultipleLine, encryptMultipleLine as encryptML, encryptMultipleLine as encryptMultiLine, SymmetricCryptor };
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
