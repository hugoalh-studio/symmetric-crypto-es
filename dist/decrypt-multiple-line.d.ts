/**
 * @function decryptMultipleLine
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} A decrypted data.
 */
declare function decryptMultipleLine(data: string, passphrase: string, times?: number): string;
export { decryptMultipleLine, decryptMultipleLine as decryptML, decryptMultipleLine as decryptMultiLine };
//# sourceMappingURL=decrypt-multiple-line.d.ts.map