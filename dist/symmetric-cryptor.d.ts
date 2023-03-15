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
     * @static decrypt
     * @description Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {string} passphrase Passphrase that need to decrypt data.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    static decrypt(data: string, passphrase: string, times?: number): string;
    /**
     * @method decryptMultipleLine
     * @alias decryptML
     * @alias decryptMultiLine
     * @description Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     */
    decryptMultipleLine(data: string, times?: number): string;
    decryptML: (data: string, times?: number) => string;
    decryptMultiLine: (data: string, times?: number) => string;
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
    static decryptMultipleLine(data: string, passphrase: string, times?: number): string;
    static decryptML: typeof SymmetricCryptor.decryptMultipleLine;
    static decryptMultiLine: typeof SymmetricCryptor.decryptMultipleLine;
    /**
     * @method encrypt
     * @description Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    encrypt(data: string, times?: number): string;
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
     * @method encryptMultipleLine
     * @alias encryptML
     * @alias encryptMultiLine
     * @description Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     */
    encryptMultipleLine(data: string, times?: number): string;
    encryptML: (data: string, times?: number) => string;
    encryptMultiLine: (data: string, times?: number) => string;
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
    static encryptMultipleLine(data: string, passphrase: string, times?: number): string;
    static encryptML: typeof SymmetricCryptor.encryptMultipleLine;
    static encryptMultiLine: typeof SymmetricCryptor.encryptMultipleLine;
}
export { SymmetricCryptor };
//# sourceMappingURL=symmetric-cryptor.d.ts.map