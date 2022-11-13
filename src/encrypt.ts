import SymmetricCryptor from "./symmetric-cryptor.js";
/**
 * @function encrypt
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
function encrypt(data: string, passphrase: string, times: number = 1): string {
	return new SymmetricCryptor(passphrase).encrypt(data, times);
}
export default encrypt;
