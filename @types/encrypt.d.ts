export = encrypt;
/**
 * @function encrypt
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @returns {string} An encrypted data.
 */
declare function encrypt(data: string, passphrase: string): string;
