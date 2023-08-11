/**
 * A password based cryptor.
 */
export declare class SymmetricCryptor {
    #private;
    /**
     * @param {string} passphrase Passphrase that need to crypto data.
     */
    constructor(passphrase: string);
    /**
     * Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    decrypt(data: string, times?: number): string;
    /**
     * Decrypt data in multiple line mode.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    decryptMultipleLine(data: string, times?: number): string;
    /**
     * Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    encrypt(data: string, times?: number): string;
    /**
     * Encrypt data in multiple line mode.
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
     * Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {string} passphrase Passphrase that need to decrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    static decrypt(data: string, passphrase: string, times?: number): string;
    /**
     * Decrypt data in multiple line mode.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {string} passphrase Passphrase that need to decrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    static decryptMultipleLine(data: string, passphrase: string, times?: number): string;
    /**
     * Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {string} passphrase Passphrase that need to encrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    static encrypt(data: string, passphrase: string, times?: number): string;
    /**
     * Encrypt data in multiple line mode.
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
export default SymmetricCryptor;
/**
 * Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
export declare function decrypt(data: string, passphrase: string, times?: number): string;
/**
 * Decrypt data in multiple line mode.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
export declare function decryptMultipleLine(data: string, passphrase: string, times?: number): string;
export { decryptMultipleLine as decryptML, decryptMultipleLine as decryptMultiLine };
/**
 * Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
export declare function encrypt(data: string, passphrase: string, times?: number): string;
/**
 * Encrypt data in multiple line mode.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
export declare function encryptMultipleLine(data: string, passphrase: string, times?: number): string;
export { encryptMultipleLine as encryptML, encryptMultipleLine as encryptMultiLine };
//# sourceMappingURL=main.d.ts.map