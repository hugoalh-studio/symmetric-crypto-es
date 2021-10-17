import { encrypt as $cryptoEncrypt, hashDigest as $cryptoHashDigest } from "./internal/crypto.mjs";
import $check from "./internal/check.mjs";
/**
 * @function encryptMultipleLine
 * @alias encryptML
 * @alias encryptMultiLine
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @returns {string} An encrypted data.
 */
function encryptMultipleLine(data, passphrase) {
	$check(data, passphrase);
	let hash = $cryptoHashDigest(passphrase);
	return data.split("\r\n").map((itemRN) => {
		return itemRN.split("\n").map((itemN) => {
			return ((itemN.length === 0) ? "" : $cryptoEncrypt(itemN, hash));
		}).join("\n");
	}).join("\r\n");
};
export default encryptMultipleLine;
