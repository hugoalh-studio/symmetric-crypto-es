import { decrypt } from "./decrypt.js";
import { decryptMultipleLine } from "./decrypt-multiple-line.js";
import { encrypt } from "./encrypt.js";
import { encryptMultipleLine } from "./encrypt-multiple-line.js";
import { SymmetricCryptor } from "./symmetric-cryptor.js";
export {
	decrypt,
	decryptMultipleLine as decryptML,
	decryptMultipleLine as decryptMultiLine,
	decryptMultipleLine,
	encrypt,
	encryptMultipleLine as encryptML,
	encryptMultipleLine as encryptMultiLine,
	encryptMultipleLine,
	SymmetricCryptor
};
export default {
	decrypt,
	decryptML: decryptMultipleLine,
	decryptMultiLine: decryptMultipleLine,
	decryptMultipleLine,
	encrypt,
	encryptML: encryptMultipleLine,
	encryptMultiLine: encryptMultipleLine,
	encryptMultipleLine,
	SymmetricCryptor
};
