import SymmetricCryptor from "./symmetric-cryptor.js";
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
export default decrypt;
