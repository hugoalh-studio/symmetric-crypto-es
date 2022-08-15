export default SymmetricCryptor;
/**
 * @class SymmetricCryptor
 * @description A password based cryptor.
 */
declare class SymmetricCryptor {
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
    #private;
}
//# sourceMappingURL=symmetric-cryptor.d.mts.map