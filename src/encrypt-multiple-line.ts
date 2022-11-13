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
 */
function encryptMultipleLine(data: string, passphrase: string, times: number = 1): string {
	return new SymmetricCryptor(passphrase).encryptMultipleLine(data, times);
}
export default encryptMultipleLine;
