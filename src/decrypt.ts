import SymmetricCryptor from "./symmetric-cryptor.js";
/**
 * @function decrypt
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 * @throws {TypeError} Argument `data` is not a valid string.
 * @throws {TypeError} Argument `passphrase` is not a valid string.
 * @throws {TypeError} Argument `times` is not a valid number.
 */
function decrypt(data: string, passphrase: string, times: number = 1): string {
	return new SymmetricCryptor(passphrase).decrypt(data, times);
}
export default decrypt;
