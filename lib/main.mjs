import decrypt from "./decrypt.mjs";
import decryptMultipleLine from "./decrypt-multiple-line.mjs";
import encrypt from "./encrypt.mjs";
import encryptMultipleLine from "./encrypt-multiple-line.mjs";
import SymmetricCryptor from "./symmetric-cryptor.mjs";
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
