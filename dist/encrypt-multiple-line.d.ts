/**
 * @function encryptMultipleLine
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
declare function encryptMultipleLine(data: string, passphrase: string, times?: number): string;
export { encryptMultipleLine, encryptMultipleLine as encryptML, encryptMultipleLine as encryptMultiLine };
//# sourceMappingURL=encrypt-multiple-line.d.ts.map