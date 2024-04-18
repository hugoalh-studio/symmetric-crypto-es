import { decodeAscii85, encodeAscii85 } from "https://deno.land/std@0.222.1/encoding/ascii85.ts";
/**
 * Algorithm name of the symmetric cryptor.
 */
export type SymmetricCryptorAlgorithmNameType = "AES-CBC" | "AES-CTR" | "AES-GCM";
/**
 * Type of the key of the symmetric cryptor.
 */
export type SymmetricCryptorKeyType = string | ArrayBuffer | DataView | Uint8Array | Uint16Array | Uint32Array | BigUint64Array;
/**
 * Input of the key of the symmetric cryptor.
 */
export interface SymmetricCryptorKeyInput {
	/**
	 * Algorithm of the symmetric cryptor.
	 * @default "AES-CBC"
	 */
	algorithm?: SymmetricCryptorAlgorithmNameType;
	/**
	 * Key of the symmetric cryptor.
	 */
	key: SymmetricCryptorKeyType;
}
interface SymmetricCryptorMeta {
	algorithm: SymmetricCryptorAlgorithmNameType;
	key: CryptoKey;
}
/**
 * A password based cryptor.
 */
export class SymmetricCryptor {
	#cryptors: SymmetricCryptorMeta[];
	private constructor(cryptors: SymmetricCryptorMeta[]) {
		this.#cryptors = cryptors;
	}
	/**
	 * Decrypt data.
	 * @param {string} data Data that need to symmetric decrypt.
	 * @returns {Promise<string>} A decrypted data.
	 */
	async decrypt(data: string): Promise<string>;
	/**
	 * Decrypt data.
	 * @param {Uint8Array} data Data that need to symmetric decrypt.
	 * @returns {Promise<Uint8Array>} A decrypted data.
	 */
	async decrypt(data: Uint8Array): Promise<Uint8Array>;
	async decrypt(data: string | Uint8Array): Promise<string | Uint8Array> {
		if (data.length === 0) {
			return data;
		}
		let resultIsString = false;
		let storage: Uint8Array;
		if (typeof data === "string") {
			resultIsString = true;
			storage = decodeAscii85(data);
		} else {
			storage = data;
		}
		for (let index = this.#cryptors.length - 1; index >= 0; index -= 1) {
			const { algorithm, key }: SymmetricCryptorMeta = this.#cryptors[index];
			switch (algorithm) {
				case "AES-CBC": {
					storage = new Uint8Array(await crypto.subtle.decrypt({
						name: algorithm,
						iv: storage.slice(0, 16)
					}, key, storage.slice(16)));
				}
					break;
				case "AES-CTR": {
					storage = new Uint8Array(await crypto.subtle.decrypt({
						name: algorithm,
						counter: storage.slice(0, 16),
						length: 64
					}, key, storage.slice(16)));
				}
					break;
				case "AES-GCM": {
					storage = new Uint8Array(await crypto.subtle.decrypt({
						name: algorithm,
						iv: storage.slice(0, 12)
					}, key, storage.slice(12)));
				}
					break;
				default:
					throw new Error(`\`${algorithm}\` is not a valid crypto algorithm! (How did you get to here?)`);
			}
		}
		return (resultIsString ? new TextDecoder().decode(storage) : storage);
	}
	/**
	 * Encrypt data.
	 * @param {string} data Data that need to symmetric encrypt.
	 * @returns {Promise<string>} An encrypted data.
	 */
	async encrypt(data: string): Promise<string>;
	/**
	 * Encrypt data.
	 * @param {Uint8Array} data Data that need to symmetric encrypt.
	 * @returns {Promise<Uint8Array>} An encrypted data.
	 */
	async encrypt(data: Uint8Array): Promise<Uint8Array>;
	async encrypt(data: string | Uint8Array): Promise<string | Uint8Array> {
		if (data.length === 0) {
			return data;
		}
		let resultIsString = false;
		let storage: Uint8Array;
		if (typeof data === "string") {
			resultIsString = true;
			storage = new TextEncoder().encode(data);
		} else {
			storage = data;
		}
		for (let index = 0; index < this.#cryptors.length; index += 1) {
			const { algorithm, key }: SymmetricCryptorMeta = this.#cryptors[index];
			switch (algorithm) {
				case "AES-CBC": {
					const iv: Uint8Array = crypto.getRandomValues(new Uint8Array(16));
					storage = Uint8Array.from([...iv, ...new Uint8Array(await crypto.subtle.encrypt({
						name: algorithm,
						iv
					}, key, storage))]);
				}
					break;
				case "AES-CTR": {
					const counter: Uint8Array = crypto.getRandomValues(new Uint8Array(16));
					storage = Uint8Array.from([...counter, ...new Uint8Array(await crypto.subtle.encrypt({
						name: algorithm,
						counter,
						length: 64
					}, key, storage))]);
				}
					break;
				case "AES-GCM": {
					const iv: Uint8Array = crypto.getRandomValues(new Uint8Array(12));
					storage = Uint8Array.from([...iv, ...new Uint8Array(await crypto.subtle.encrypt({
						name: algorithm,
						iv
					}, key, storage))]);
				}
					break;
				default:
					throw new Error(`\`${algorithm}\` is not a valid crypto algorithm! (How did you get to here?)`);
			}
		}
		return (resultIsString ? encodeAscii85(storage) : storage);
	}
}
async function createCryptorKey(input: SymmetricCryptorKeyInput | SymmetricCryptorKeyType): Promise<SymmetricCryptorMeta> {
	let algorithm: SymmetricCryptorAlgorithmNameType;
	let key: SymmetricCryptorKeyType;
	if (
		typeof input === "string" ||
		input instanceof ArrayBuffer ||
		input instanceof DataView ||
		input instanceof Uint8Array ||
		input instanceof Uint16Array ||
		input instanceof Uint32Array ||
		input instanceof BigUint64Array
	) {
		algorithm = "AES-CBC";
		key = input;
	} else {
		algorithm = input.algorithm ?? "AES-CBC";
		key = input.key;
	}
	return {
		algorithm,
		key: await crypto.subtle.importKey("raw", await crypto.subtle.digest("SHA-256", (typeof key === "string") ? new TextEncoder().encode(key) : key), { name: algorithm }, false, ["decrypt", "encrypt"])
	};
}
/**
 * Create an instance of the symmetric cryptor.
 * @param {SymmetricCryptorKeyType} key Key of the symmetric cryptor.
 * @param {number} [times] Times of the crypto.
 * @returns {Promise<SymmetricCryptor>} Instance of the symmetric cryptor.
 */
export async function createSymmetricCryptor(key: SymmetricCryptorKeyType, times?: number): Promise<SymmetricCryptor>;
/**
 * Create an instance of the symmetric cryptor.
 * @param {SymmetricCryptorKeyInput} input Input of the key of the symmetric cryptor.
 * @param {number} [times] Times of the crypto.
 * @returns {Promise<SymmetricCryptor>} Instance of the symmetric cryptor.
 */
export async function createSymmetricCryptor(input: SymmetricCryptorKeyInput, times?: number): Promise<SymmetricCryptor>;
/**
 * Create an instance of the symmetric cryptor.
 * @param {(SymmetricCryptorKeyInput | SymmetricCryptorKeyType)[]} inputs Inputs of the key of the symmetric cryptor.
 * @returns {Promise<SymmetricCryptor>} Instance of the symmetric cryptor.
 */
export async function createSymmetricCryptor(inputs: (SymmetricCryptorKeyInput | SymmetricCryptorKeyType)[]): Promise<SymmetricCryptor>;
export async function createSymmetricCryptor(param0: SymmetricCryptorKeyInput | SymmetricCryptorKeyType | (SymmetricCryptorKeyInput | SymmetricCryptorKeyType)[], times?: number): Promise<SymmetricCryptor> {
	const cryptors: SymmetricCryptorMeta[] = [];
	if (Array.isArray(param0)) {
		cryptors.push(...await Promise.all(param0.map((input: SymmetricCryptorKeyInput | SymmetricCryptorKeyType): Promise<SymmetricCryptorMeta> => {
			return createCryptorKey(input);
		})));
	} else {
		const cryptor: SymmetricCryptorMeta = await createCryptorKey(param0);
		if (typeof times === "undefined") {
			cryptors.push(cryptor);
		} else {
			if (!(Number.isSafeInteger(times) && times >= 1)) {
				throw new TypeError(`Argument \`times\` is not a number which is integer, safe, and >= 1!`);
			}
			for (let index = 0; index < times; index += 1) {
				cryptors.push(cryptor);
			}
		}
	}
	if (cryptors.length > 0) {
		//@ts-ignore Access private constructor.
		return new SymmetricCryptor(cryptors);
	}
	throw new Error("No inputs!");
}
export default createSymmetricCryptor;
