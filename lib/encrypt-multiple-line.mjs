import * as internalCrypto from "./internal/crypto.mjs";
import check from "./internal/check.mjs";
/**
 * @function encryptMultipleLine
 * @alias encryptML
 * @alias encryptMultiLine
 * @description Encrypt data.
 * @param {string} data Data that need to symmetric encrypt.
 * @param {string} passphrase Passphrase that need to encrypt data.
 * @returns {string} A encrypted data.
 */
function encryptMultipleLine(data, passphrase) {
	check(data, passphrase);
	let hash = internalCrypto.hashDigest(passphrase);
	let resultObjectRN = {};
	Promise.allSettled(
		data.split("\r\n").map((itemRN, indexRN) => {
			new Promise(() => {
				let resultObjectN = {};
				Promise.allSettled(
					itemRN.split("\n").map((itemN, indexN) => {
						new Promise(() => {
							resultObjectN[indexN] = ((itemN.length === 0) ? "" : internalCrypto.encrypt(itemN, hash));
						}).catch();
					})
				);
				resultObjectRN[indexRN] = Object.values(resultObjectN).join("\n");
			}).catch();
		})
	);
	return Object.values(resultObjectRN).join("\r\n");
};
export default encryptMultipleLine;
