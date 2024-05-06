# Symmetric Crypto (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/symmetric-crypto-es](https://img.shields.io/github/v/release/hugoalh-studio/symmetric-crypto-es?label=hugoalh-studio/symmetric-crypto-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/symmetric-crypto-es")](https://github.com/hugoalh-studio/symmetric-crypto-es)
[![JSR: @hugoalh/symmetric-crypto](https://img.shields.io/jsr/v/@hugoalh/symmetric-crypto?label=JSR%20@hugoalh/symmetric-crypto&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/symmetric-crypto")](https://jsr.io/@hugoalh/symmetric-crypto)
[![NPM: @hugoalh/symmetric-crypto](https://img.shields.io/npm/v/@hugoalh/symmetric-crypto?label=@hugoalh/symmetric-crypto&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/symmetric-crypto")](https://www.npmjs.com/package/@hugoalh/symmetric-crypto)

An ES (JavaScript & TypeScript) module to provide an easier symmetric crypto.

## 🔰 Begin

### 🎯 Targets

|  | **Registry - JSR** | **Registry - NPM** | **Remote Import** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | [✔️ `node_modules`](https://jsr.io/docs/npm-compatibility) | [✔️ Specifier `npm:`](https://bun.sh/docs/runtime/autoimport) | ❌ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | [✔️ `node_modules`](https://jsr.io/docs/with/cloudflare-workers) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |
| **[Deno](https://deno.land/)** >= v1.42.0 | [✔️ Specifier `jsr:`](https://jsr.io/docs/with/deno) | [✔️ Specifier `npm:`](https://docs.deno.com/runtime/manual/node/npm_specifiers) | [✔️](https://docs.deno.com/runtime/manual/basics/modules/#remote-import) |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | [✔️ `node_modules`](https://jsr.io/docs/with/node) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |

> **ℹ️ Note**
>
> It is possible to use this module in other methods/ways which not listed in here, however it is not officially supported.

### #️⃣ Registries Identifier

- **JSR:**
  ```
  @hugoalh/symmetric-crypto
  ```
- **NPM:**
  ```
  @hugoalh/symmetric-crypto
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to use this module with tag for immutability.

### #️⃣ Remote Import Paths

- **GitHub Raw:** (Require Tag)
  ```
  https://raw.githubusercontent.com/hugoalh-studio/symmetric-crypto-es/${Tag}/mod.ts
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.

### 🛡️ Permissions

*This module does not require any permission.*

## 🧩 APIs

- ```ts
  class SymmetricCryptor {
    decrypt(data: string): Promise<string>;
    decrypt(data: Uint8Array): Promise<Uint8Array>;
    decryptFile(filePath: string | URL): Promise<this>;
    decryptFiles(...filesPath: (string | URL)[]): Promise<this>;
    encrypt(data: string): Promise<string>;
    encrypt(data: Uint8Array): Promise<Uint8Array>;
    encryptFile(filePath: string | URL): Promise<this>;
    encryptFiles(...filesPath: (string | URL)[]): Promise<this>;
  }
  ```
- ```ts
  enum SymmetricCryptorAlgorithm {
    "AES-CBC" = "AES-CBC",
    "AES-CTR" = "AES-CTR",
    "AES-GCM" = "AES-GCM",
    AESCBC = "AES-CBC",
    AESCTR = "AES-CTR",
    AESGCM = "AES-GCM"
  }
  ```
- ```ts
  function createSymmetricCryptor(key: SymmetricCryptorKeyType, options?: SymmetricCryptorOptions): Promise<SymmetricCryptor>;
  function createSymmetricCryptor(input: SymmetricCryptorKeyInput, options?: SymmetricCryptorOptions): Promise<SymmetricCryptor>;
  function createSymmetricCryptor(inputs: (SymmetricCryptorKeyInput | SymmetricCryptorKeyType)[], options?: Omit<SymmetricCryptorOptions, "times">): Promise<SymmetricCryptor>;
  ```
- ```ts
  interface SymmetricCryptorOptions {
    /**
     * Decoder of the stringify cipher text, must also define and exchangeable with property `encoder`. Default to ASCII85 decoder.
     */
    decoder?: SymmetricCryptorCipherTextDecoder;
    /**
     * Encoder of the stringify cipher text, must also define and exchangeable with property `decoder`. Default to ASCII85 encoder.
     */
    encoder?: SymmetricCryptorCipherTextEncoder;
    /**
     * Times of the crypto.
     * @default 1
     */
    times?: number;
  }
  ```
- ```ts
  interface SymmetricCryptorKeyInput {
    /**
     * Algorithm of the symmetric cryptor.
     * @default "AES-CBC"
     */
    algorithm?: SymmetricCryptorAlgorithm | keyof typeof SymmetricCryptorAlgorithm;
    /**
     * Key of the symmetric cryptor.
     */
    key: SymmetricCryptorKeyType;
  }
  ```
- ```ts
  type SymmetricCryptorCipherTextDecoder = (input: string) => Uint8Array;
  ```
- ```ts
  type SymmetricCryptorCipherTextEncoder = (input: Uint8Array) => string;
  ```
- ```ts
  type SymmetricCryptorKeyType = string | ArrayBuffer | DataView | Uint8Array | Uint16Array | Uint32Array | BigUint64Array;
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/symmetric-crypto)

## ✍️ Examples

- ```ts
  const data = "qwertyuiop";
  const cryptor = await createSymmetricCryptor("<PassWord123456>!!");
  const encrypted = await cryptor.encrypt(data);
  console.log(encrypted);
  // "lST)L-9$J[MPqk)3Pe1qa(;,i)Wi]"4oD9+OE(Hc"
  const decrypted = await cryptor.decrypt(encrypted);
  console.log(decrypted);
  // "qwertyuiop"
  ```
