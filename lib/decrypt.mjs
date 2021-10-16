import { decrypt as $cryptoDecrypt, hashDigest as $cryptoHashDigest } from "./internal/crypto.mjs";
import $check from "./internal/check.mjs";
/**
 * @function decrypt
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @returns {string} A decrypted data.
 */
function decrypt(data, passphrase) {
	$check(data, passphrase);
	return $cryptoDecrypt(data, $cryptoHashDigest(passphrase));
};
export default decrypt;
