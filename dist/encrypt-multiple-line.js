import { SymmetricCryptor } from "./symmetric-cryptor.js";
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
export { encryptMultipleLine, encryptMultipleLine as encryptML, encryptMultipleLine as encryptMultiLine };
