import { SymmetricCryptor } from "./symmetric-cryptor.js";
/**
 * @function decryptMultipleLine
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
function decryptMultipleLine(data: string, passphrase: string, times = 1): string {
	return new SymmetricCryptor(passphrase).decryptMultipleLine(data, times);
}
export {
	decryptMultipleLine,
	decryptMultipleLine as decryptML,
	decryptMultipleLine as decryptMultiLine
};
