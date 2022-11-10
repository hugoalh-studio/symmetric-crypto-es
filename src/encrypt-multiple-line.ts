import SymmetricCryptor from "./symmetric-cryptor.js";
/**
 * @function encryptMultipleLine
 * @alias encryptML
 * @alias encryptMultiline
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
function encryptMultipleLine(data: string, passphrase: string, times: number = 1): string {
	return new SymmetricCryptor(passphrase).encryptMultipleLine(data, times);
}
export default encryptMultipleLine;
