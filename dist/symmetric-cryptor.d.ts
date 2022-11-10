/**
 * @class SymmetricCryptor
 * @description A password based cryptor.
 */
declare class SymmetricCryptor {
    #private;
    /**
     * @constructor
     * @param {string} passphrase Passphrase that need to crypto data.
     * @throws {TypeError} Argument `passphrase` is not a valid string.
     */
    constructor(passphrase: string);
    /**
     * @method decrypt
     * @description Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     * @throws {TypeError} Argument `data` is not a valid string.
     * @throws {TypeError} Argument `times` is not a valid number.
     */
    decrypt(data: string, times?: number): string;
    /**
     * @method decryptMultipleLine
     * @description Decrypt data.
     * @param {string} data Data that need to symmetric decrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} A decrypted data.
     * @throws {TypeError} Argument `data` is not a valid string.
     * @throws {TypeError} Argument `times` is not a valid number.
     */
    decryptMultipleLine(data: string, times?: number): string;
    decryptML: typeof this.decryptMultipleLine;
    decryptMultiline: typeof this.decryptMultipleLine;
    decryptMultiLine: typeof this.decryptMultipleLine;
    /**
     * @method encrypt
     * @description Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     * @throws {TypeError} Argument `data` is not a valid string.
     * @throws {TypeError} Argument `times` is not a valid number.
     */
    encrypt(data: string, times?: number): string;
    /**
     * @method encryptMultipleLine
     * @description Encrypt data.
     * @param {string} data Data that need to symmetric encrypt.
     * @param {number} [times=1] Crypto rotation.
     * @returns {string} An encrypted data.
     * @throws {TypeError} Argument `data` is not a valid string.
     * @throws {TypeError} Argument `times` is not a valid number.
     */
    encryptMultipleLine(data: string, times?: number): string;
    encryptML: typeof this.encryptMultipleLine;
    encryptMultiline: typeof this.encryptMultipleLine;
    encryptMultiLine: typeof this.encryptMultipleLine;
}
export default SymmetricCryptor;
//# sourceMappingURL=symmetric-cryptor.d.ts.map