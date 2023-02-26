import SymmetricCryptor from "./symmetric-cryptor.js";
/**
 * @function decryptMultipleLine
 * @alias decryptML
 * @alias decryptMultiLine
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
function decryptMultipleLine(data, passphrase, times = 1) {
    return new SymmetricCryptor(passphrase).decryptMultipleLine(data, times);
}
export default decryptMultipleLine;
