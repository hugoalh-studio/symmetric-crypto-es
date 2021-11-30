/**
 * @private
 * @function decrypt
 * @param {string} data
 * @param {Buffer} hash
 * @returns {string}
 */
export function decrypt(data: string, hash: Buffer): string;
/**
 * @private
 * @function encrypt
 * @param {string} data
 * @param {Buffer} hash
 * @returns {string}
 */
export function encrypt(data: string, hash: Buffer): string;
/**
 * @private
 * @function hashDigest
 * @param {string} passphrase
 * @returns {Buffer}
 */
export function hashDigest(passphrase: string): Buffer;
//# sourceMappingURL=crypto.d.mts.map