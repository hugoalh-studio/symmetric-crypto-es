/**
 * @function encrypt
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @param {number} [times=1] Crypto rotation.
 * @returns {string} An encrypted data.
 */
declare function encrypt(data: string, passphrase: string, times?: number): string;
export default encrypt;
//# sourceMappingURL=encrypt.d.ts.map