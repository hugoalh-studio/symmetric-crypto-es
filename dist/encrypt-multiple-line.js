import SymmetricCryptor from "./symmetric-cryptor.js";
/**
 * @function encryptMultipleLine
 * @alias encryptML
 * @alias encryptMultiLine
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 * @throws {TypeError} Argument `data` is not a valid string.
 * @throws {TypeError} Argument `passphrase` is not a valid string.
 * @throws {TypeError} Argument `times` is not a valid number.
 */
function encryptMultipleLine(data, passphrase, times = 1) {
    return new SymmetricCryptor(passphrase).encryptMultipleLine(data, times);
}
export default encryptMultipleLine;
