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
var _SymmetricCryptor_passphraseStorage;
import { createCipheriv as cryptoCreateCipheriv, createDecipheriv as cryptoCreateDecipheriv, createHash as cryptoCreateHash, randomBytes as cryptoRandomBytes } from "node:crypto";
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
function $checkData(data) {
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
function $checkTimes(times) {
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
function $decrypt(data, hash) {
    let encrypted = Buffer.from(data, "base64");
    let decipher = cryptoCreateDecipheriv("AES-256-CBC", hash, encrypted.subarray(0, 16));
    let decrypted = Buffer.concat([decipher.update(encrypted.subarray(16)), decipher.final()]).toString();
    return decrypted.substring(0, decrypted.length - decrypted.charCodeAt(decrypted.length - 1));
}
/**
 * @private
 * @function $encrypt
 * @param {string} data
 * @param {Buffer} hash
 * @returns {string}
 */
function $encrypt(data, hash) {
    let iv = cryptoRandomBytes(16);
    let tone = 16 - data.length % 16;
    let cipher = cryptoCreateCipheriv("AES-256-CBC", hash, iv);
    return Buffer.concat([iv, Buffer.concat([cipher.update(data.padEnd(data.length + tone, String.fromCharCode(tone))), cipher.final()])]).toString("base64");
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
        _SymmetricCryptor_passphraseStorage.set(this, void 0);
        if (!new StringItemFilter({ minimumLength: 4 }).test(passphrase)) {
            throw new TypeError(`Argument \`passphrase\` must be type of string and at least 4 characters!`);
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
            result = $decrypt(result, __classPrivateFieldGet(this, _SymmetricCryptor_passphraseStorage, "f"));
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
    decryptMultipleLine(data, times = 1) {
        $checkData(data);
        $checkTimes(times);
        let result = data;
        for (let index = 0; index < times; index++) {
            result = result.split("\r\n").map((itemRN) => {
                return itemRN.split("\n").map((itemN) => {
                    return ((itemN.length === 0) ? "" : $decrypt(itemN, __classPrivateFieldGet(this, _SymmetricCryptor_passphraseStorage, "f")));
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
    encrypt(data, times = 1) {
        $checkData(data);
        $checkTimes(times);
        let result = data;
        for (let index = 0; index < times; index++) {
            result = $encrypt(result, __classPrivateFieldGet(this, _SymmetricCryptor_passphraseStorage, "f"));
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
    encryptMultipleLine(data, times = 1) {
        $checkData(data);
        $checkTimes(times);
        let result = data;
        for (let index = 0; index < times; index++) {
            result = result.split("\r\n").map((itemRN) => {
                return itemRN.split("\n").map((itemN) => {
                    return ((itemN.length === 0) ? "" : $encrypt(itemN, __classPrivateFieldGet(this, _SymmetricCryptor_passphraseStorage, "f")));
                }).join("\n");
            }).join("\r\n");
        }
        return result;
    }
}
_SymmetricCryptor_passphraseStorage = new WeakMap();
export default SymmetricCryptor;
