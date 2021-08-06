import * as internalCrypto from "./internal/crypto.mjs";
import check from "./internal/check.mjs";
/**
 * @function decryptMultipleLine
 * @alias decryptML
 * @alias decryptMultiLine
 * @description Decrypt data.
 * @param {string} data Data that need to symmetric decrypt.
 * @param {string} passphrase Passphrase that need to decrypt data.
 * @returns {string} A decrypted data.
 */
function decryptMultipleLine(data, passphrase) {
	check(data, passphrase);
	let hash = internalCrypto.hash(passphrase),
		resultObjectRN = {};
	Promise.allSettled(
		data.split("\r\n").map((itemRN, indexRN) => {
			new Promise(() => {
				let resultObjectN = {};
				Promise.allSettled(
					itemRN.split("\n").map((itemN, indexN) => {
						new Promise(() => {
							resultObjectN[indexN] = (itemN.length === 0) ? "" : internalCrypto.decrypt(itemN, hash);
						}).catch();
					})
				);
				resultObjectRN[indexRN] = Object.values(resultObjectN).join("\n");
			}).catch();
		})
	);
	return Object.values(resultObjectRN).join("\r\n");
};
export default decryptMultipleLine;