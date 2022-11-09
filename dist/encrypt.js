import SymmetricCryptor from "./symmetric-cryptor.js";
/**
 * @function encrypt
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 * @throws {TypeError} Argument `data` is not a valid string.
 * @throws {TypeError} Argument `passphrase` is not a valid string.
 * @throws {TypeError} Argument `times` is not a valid number.
 */
function encrypt(data, passphrase, times = 1) {
    return new SymmetricCryptor(passphrase).encrypt(data, times);
}
export default encrypt;
