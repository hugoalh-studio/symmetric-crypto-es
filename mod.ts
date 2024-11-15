import {
	decodeAscii85,
	encodeAscii85
} from "jsr:@std/encoding@^1.0.5";
/**
 * Enum of the algorithm of the symmetric cryptor.
 */
export enum SymmetricCryptorAlgorithm {
	"AES-CBC" = "AES-CBC",
	"AES-CTR" = "AES-CTR",
	"AES-GCM" = "AES-GCM",
	AESCBC = "AES-CBC",
	AESCTR = "AES-CTR",
	AESGCM = "AES-GCM"
}
export type SymmetricCryptorCipherTextDecoder = (input: string) => Uint8Array;
export type SymmetricCryptorCipherTextEncoder = (input: Uint8Array) => string;
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
	 * @default {"AES-CBC"}
	 */
	algorithm?: SymmetricCryptorAlgorithm | keyof typeof SymmetricCryptorAlgorithm;
	/**
	 * Key of the symmetric cryptor.
	 */
	key: SymmetricCryptorKeyType;
}
interface SymmetricCryptorInternalCryptor {
	algorithm: `${SymmetricCryptorAlgorithm}`;
	key: CryptoKey;
}
interface SymmetricCryptorInternalFileIO {
	context: Uint8Array;
	filePath: string | URL;
}
/**
 * A password based cryptor.
 */
export class SymmetricCryptor {
	get [Symbol.toStringTag](): string {
		return "SymmetricCryptor";
	}
	#cryptors: SymmetricCryptorInternalCryptor[];
	#decoder: SymmetricCryptorCipherTextDecoder;
	#encoder: SymmetricCryptorCipherTextEncoder;
	private constructor(cryptors: SymmetricCryptorInternalCryptor[], decoder: SymmetricCryptorCipherTextDecoder, encoder: SymmetricCryptorCipherTextEncoder) {
		this.#cryptors = cryptors;
		this.#decoder = decoder;
		this.#encoder = encoder;
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
		const resultIsString: boolean = typeof data === "string";
		let storage: Uint8Array = resultIsString ? this.#decoder(data as string) : (data as Uint8Array);
		for (const {
			algorithm,
			key
		} of this.#cryptors.toReversed()) {
			let decryptParameterAlgorithm: AlgorithmIdentifier | AesCbcParams | AesCtrParams | AesGcmParams;
			let decryptParameterData: BufferSource;
			switch (algorithm) {
				case "AES-CBC":
					decryptParameterAlgorithm = {
						name: algorithm,
						iv: storage.slice(0, 16)
					};
					decryptParameterData = storage.slice(16);
					break;
				case "AES-CTR":
					decryptParameterAlgorithm = {
						name: algorithm,
						counter: storage.slice(0, 16),
						length: 64
					};
					decryptParameterData = storage.slice(16);
					break;
				case "AES-GCM":
					decryptParameterAlgorithm = {
						name: algorithm,
						iv: storage.slice(0, 12)
					};
					decryptParameterData = storage.slice(12);
					break;
				default:
					throw new Error(`\`${algorithm}\` is not a symmetric crypto algorithm which able to process! How did you get to here?`);
			}
			storage = new Uint8Array(await crypto.subtle.decrypt(decryptParameterAlgorithm, key, decryptParameterData));
		}
		return (resultIsString ? new TextDecoder().decode(storage) : storage);
	}
	/**
	 * Decrypt files in place. All of the files will not decrypted if any file fail to decrypt.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * > 
	 * > - Deno
	 * >   - File System - Read (`read`)
	 * >     - *Resources*
	 * >   - File System - Write (`write`)
	 * >     - *Resources*
	 * > - NodeJS
	 * >   - File System - Read (`fs-read`)
	 * >     - *Resources*
	 * >   - File System - Write (`fs-write`)
	 * >     - *Resources*
	 * @param {...(string | URL)} filesPath Path of the files.
	 * @returns {Promise<this>}
	 */
	async decryptFile(...filesPath: (string | URL)[]): Promise<this> {
		const result: SymmetricCryptorInternalFileIO[] = await Promise.all(filesPath.map(async (filePath: string | URL): Promise<SymmetricCryptorInternalFileIO> => {
			try {
				return {
					context: await this.decrypt(await Deno.readFile(filePath)),
					filePath
				};
			} catch (error) {
				throw new Error(`Unable to decrypt file \`${filePath}\`: ${(error as Error)?.message ?? error}`);
			}
		}));
		await Promise.all(result.map(({
			context,
			filePath
		}: SymmetricCryptorInternalFileIO): Promise<void> => {
			return Deno.writeFile(filePath, context, { create: false });
		}));
		return this;
	}
	/**
	 * Decrypt files in place. All of the files will not decrypted if any file fail to decrypt.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * > 
	 * > - Deno
	 * >   - File System - Read (`read`)
	 * >     - *Resources*
	 * >   - File System - Write (`write`)
	 * >     - *Resources*
	 * > - NodeJS
	 * >   - File System - Read (`fs-read`)
	 * >     - *Resources*
	 * >   - File System - Write (`fs-write`)
	 * >     - *Resources*
	 * @deprecated Migrate to {@linkcode SymmetricCryptor.decryptFile}.
	 */
	decryptFiles: (...filesPath: (string | URL)[]) => Promise<this> = this.decryptFile;
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
		const resultIsString: boolean = typeof data === "string";
		let storage: Uint8Array = resultIsString ? new TextEncoder().encode(data as string) : (data as Uint8Array);
		for (const {
			algorithm,
			key
		} of this.#cryptors) {
			let encryptParameterAlgorithm: AlgorithmIdentifier | AesCbcParams | AesCtrParams | AesGcmParams;
			let token: Uint8Array;
			switch (algorithm) {
				case "AES-CBC":
					token = crypto.getRandomValues(new Uint8Array(16));
					encryptParameterAlgorithm = {
						name: algorithm,
						iv: token
					};
					break;
				case "AES-CTR":
					token = crypto.getRandomValues(new Uint8Array(16));
					encryptParameterAlgorithm = {
						name: algorithm,
						counter: token,
						length: 64
					};
					break;
				case "AES-GCM":
					token = crypto.getRandomValues(new Uint8Array(12));
					encryptParameterAlgorithm = {
						name: algorithm,
						iv: token
					};
					break;
				default:
					throw new Error(`\`${algorithm}\` is not a symmetric crypto algorithm which able to process! How did you get to here?`);
			}
			storage = Uint8Array.from([...token, ...new Uint8Array(await crypto.subtle.encrypt(encryptParameterAlgorithm, key, storage))]);
		}
		return (resultIsString ? this.#encoder(storage) : storage);
	}
	/**
	 * Encrypt files in place. All of the files will not encrypted if any file fail to encrypt.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * > 
	 * > - Deno
	 * >   - File System - Read (`read`)
	 * >     - *Resources*
	 * >   - File System - Write (`write`)
	 * >     - *Resources*
	 * > - NodeJS
	 * >   - File System - Read (`fs-read`)
	 * >     - *Resources*
	 * >   - File System - Write (`fs-write`)
	 * >     - *Resources*
	 * @param {...(string | URL)} filesPath Path of the files.
	 * @returns {Promise<this>}
	 */
	async encryptFile(...filesPath: (string | URL)[]): Promise<this> {
		const result: SymmetricCryptorInternalFileIO[] = await Promise.all(filesPath.map(async (filePath: string | URL): Promise<SymmetricCryptorInternalFileIO> => {
			try {
				return {
					context: await this.encrypt(await Deno.readFile(filePath)),
					filePath
				};
			} catch (error) {
				throw new Error(`Unable to encrypt file \`${filePath}\`: ${(error as Error)?.message ?? error}`);
			}
		}));
		await Promise.all(result.map(({
			context,
			filePath
		}: SymmetricCryptorInternalFileIO): Promise<void> => {
			return Deno.writeFile(filePath, context, { create: false });
		}));
		return this;
	}
	/**
	 * Encrypt files in place. All of the files will not encrypted if any file fail to encrypt.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * > 
	 * > - Deno
	 * >   - File System - Read (`read`)
	 * >     - *Resources*
	 * >   - File System - Write (`write`)
	 * >     - *Resources*
	 * > - NodeJS
	 * >   - File System - Read (`fs-read`)
	 * >     - *Resources*
	 * >   - File System - Write (`fs-write`)
	 * >     - *Resources*
	 * @deprecated Migrate to {@linkcode SymmetricCryptor.encryptFile}.
	 */
	encryptFiles: (...filesPath: (string | URL)[]) => Promise<this> = this.encryptFile;
}
/**
 * Create the key for the cryptor.
 * @param {SymmetricCryptorKeyInput | SymmetricCryptorKeyType} input Input.
 * @returns {Promise<SymmetricCryptorInternalCryptor>} Key for the cryptor.
 */
async function createCryptorKey(input: SymmetricCryptorKeyInput | SymmetricCryptorKeyType): Promise<SymmetricCryptorInternalCryptor> {
	let algorithm: `${SymmetricCryptorAlgorithm}`;
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
		const algorithmFmt: `${SymmetricCryptorAlgorithm}` | undefined = SymmetricCryptorAlgorithm[input.algorithm ?? "AES-CBC"];
		if (typeof algorithmFmt === "undefined") {
			throw new RangeError(`\`${input.algorithm}\` is not a valid symmetric crypto algorithm! Only accept these values: ${Array.from(new Set<string>(Object.keys(SymmetricCryptorAlgorithm)).values()).sort().join(", ")}`);
		}
		algorithm = algorithmFmt;
		key = input.key;
	}
	return {
		algorithm,
		key: await crypto.subtle.importKey("raw", await crypto.subtle.digest("SHA-256", (typeof key === "string") ? new TextEncoder().encode(key) : key), { name: algorithm }, false, ["decrypt", "encrypt"])
	};
}
export interface SymmetricCryptorOptions {
	/**
	 * Decoder of the stringify cipher text, must also define and exchangeable with property {@linkcode encoder}. Default to use ASCII85 decoder.
	 */
	decoder?: SymmetricCryptorCipherTextDecoder;
	/**
	 * Encoder of the stringify cipher text, must also define and exchangeable with property {@linkcode decoder}. Default to use ASCII85 encoder.
	 */
	encoder?: SymmetricCryptorCipherTextEncoder;
	/**
	 * Times of the crypto.
	 * @default {1}
	 */
	times?: number;
}
/**
 * Create an instance of the class {@linkcode SymmetricCryptor}.
 * @param {SymmetricCryptorKeyInput | SymmetricCryptorKeyType} key Key of the symmetric cryptor.
 * @param {SymmetricCryptorOptions} [options={}] Options of the symmetric cryptor.
 * @returns {Promise<SymmetricCryptor>} An instance of the class {@linkcode SymmetricCryptor}.
 */
export async function createSymmetricCryptor(key: SymmetricCryptorKeyInput | SymmetricCryptorKeyType, options?: SymmetricCryptorOptions): Promise<SymmetricCryptor>;
/**
 * Create an instance of the class {@linkcode SymmetricCryptor}.
 * @param {(SymmetricCryptorKeyInput | SymmetricCryptorKeyType)[]} keys Keys of the symmetric cryptor.
 * @param {Omit<SymmetricCryptorOptions, "times">} [options={}] Options of the symmetric cryptor.
 * @returns {Promise<SymmetricCryptor>} An instance of the class {@linkcode SymmetricCryptor}.
 */
export async function createSymmetricCryptor(keys: (SymmetricCryptorKeyInput | SymmetricCryptorKeyType)[], options?: Omit<SymmetricCryptorOptions, "times">): Promise<SymmetricCryptor>;
export async function createSymmetricCryptor(param0: SymmetricCryptorKeyInput | SymmetricCryptorKeyType | (SymmetricCryptorKeyInput | SymmetricCryptorKeyType)[], options: SymmetricCryptorOptions = {}): Promise<SymmetricCryptor> {
	if (!(
		(typeof options.decoder !== "undefined" && typeof options.encoder !== "undefined") ||
		(typeof options.decoder === "undefined" && typeof options.encoder === "undefined")
	)) {
		throw new ReferenceError(`Parameters \`options.decoder\` and \`options.encoder\` are not all defined or all undefined!`);
	}
	const decoder: SymmetricCryptorCipherTextDecoder = options.decoder ?? decodeAscii85;
	const encoder: SymmetricCryptorCipherTextEncoder = options.encoder ?? encodeAscii85;
	const cryptors: SymmetricCryptorInternalCryptor[] = [];
	if (Array.isArray(param0)) {
		cryptors.push(...await Promise.all(param0.map((input: SymmetricCryptorKeyInput | SymmetricCryptorKeyType): Promise<SymmetricCryptorInternalCryptor> => {
			return createCryptorKey(input);
		})));
	} else {
		const cryptor: SymmetricCryptorInternalCryptor = await createCryptorKey(param0);
		if (typeof options.times === "undefined") {
			cryptors.push(cryptor);
		} else {
			if (!(Number.isSafeInteger(options.times) && options.times >= 1)) {
				throw new TypeError(`\`${options.times}\` (parameter \`options.times\`) is not a number which is integer, safe, and >= 1!`);
			}
			for (let index: number = 0; index < options.times; index += 1) {
				cryptors.push(cryptor);
			}
		}
	}
	if (cryptors.length > 0) {
		//@ts-ignore Access private constructor.
		return new SymmetricCryptor(cryptors, decoder, encoder);
	}
	throw new ReferenceError(`Parameter \`keys\` is not defined!`);
}
export default createSymmetricCryptor;
