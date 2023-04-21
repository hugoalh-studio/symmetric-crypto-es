/**
 * @class SymmetricCryptor
 * @description A password based cryptor.
 */
declare class SymmetricCryptor {
    #private;
    /**
     * @constructor
     * @param {string} passphrase Passphrase that need to crypto data.
     */
    constructor(passphrase: string);
    /**
     * @method decrypt
     * @description Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    decrypt(data: string, times?: number): string;
    /**
     * @method decryptMultipleLine
     * @description Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    decryptMultipleLine(data: string, times?: number): string;
    /**
     * @method encrypt
     * @description Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    encrypt(data: string, times?: number): string;
    /**
     * @method encryptMultipleLine
     * @description Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    encryptMultipleLine(data: string, times?: number): string;
    /** @alias decryptMultipleLine */ decryptML: (data: string, times?: number) => string;
    /** @alias decryptMultipleLine */ decryptMultiLine: (data: string, times?: number) => string;
    /** @alias encryptMultipleLine */ encryptML: (data: string, times?: number) => string;
    /** @alias encryptMultipleLine */ encryptMultiLine: (data: string, times?: number) => string;
    /**
     * @static decrypt
     * @description Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {string} passphrase Passphrase that need to decrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    static decrypt(data: string, passphrase: string, times?: number): string;
    /**
     * @static decryptMultipleLine
     * @description Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {string} passphrase Passphrase that need to decrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    static decryptMultipleLine(data: string, passphrase: string, times?: number): string;
    /**
     * @static encrypt
     * @description Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {string} passphrase Passphrase that need to encrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    static encrypt(data: string, passphrase: string, times?: number): string;
    /**
     * @static encryptMultipleLine
     * @description Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {string} passphrase Passphrase that need to encrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    static encryptMultipleLine(data: string, passphrase: string, times?: number): string;
    /** @alias decryptMultipleLine */ static decryptML: typeof SymmetricCryptor.decryptMultipleLine;
    /** @alias decryptMultipleLine */ static decryptMultiLine: typeof SymmetricCryptor.decryptMultipleLine;
    /** @alias encryptMultipleLine */ static encryptML: typeof SymmetricCryptor.encryptMultipleLine;
    /** @alias encryptMultipleLine */ static encryptMultiLine: typeof SymmetricCryptor.encryptMultipleLine;
}
/**
 * @function decrypt
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
declare function decrypt(data: string, passphrase: string, times?: number): string;
/**
 * @function decryptMultipleLine
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
declare function decryptMultipleLine(data: string, passphrase: string, times?: number): string;
/**
 * @function encrypt
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
declare function encrypt(data: string, passphrase: string, times?: number): string;
/**
 * @function encryptMultipleLine
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
declare function encryptMultipleLine(data: string, passphrase: string, times?: number): string;
export { decrypt, decryptMultipleLine, decryptMultipleLine as decryptML, decryptMultipleLine as decryptMultiLine, encrypt, encryptMultipleLine, encryptMultipleLine as encryptML, encryptMultipleLine as encryptMultiLine, SymmetricCryptor };
declare const _default: {
    decrypt: typeof decrypt;
    decryptML: typeof decryptMultipleLine;
    decryptMultiLine: typeof decryptMultipleLine;
    decryptMultipleLine: typeof decryptMultipleLine;
    encrypt: typeof encrypt;
    encryptML: typeof encryptMultipleLine;
    encryptMultiLine: typeof encryptMultipleLine;
    encryptMultipleLine: typeof encryptMultipleLine;
    SymmetricCryptor: typeof SymmetricCryptor;
};
export default _default;
//# sourceMappingURL=main.d.ts.map