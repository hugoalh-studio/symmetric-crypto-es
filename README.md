# Symmetric Crypto (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/symmetric-crypto-es](https://img.shields.io/github/v/release/hugoalh-studio/symmetric-crypto-es?label=hugoalh-studio/symmetric-crypto-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/symmetric-crypto-es")](https://github.com/hugoalh-studio/symmetric-crypto-es)
[![JSR: @hugoalh/symmetric-crypto](https://img.shields.io/jsr/v/@hugoalh/symmetric-crypto?label=JSR%20@hugoalh/symmetric-crypto&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/symmetric-crypto")](https://jsr.io/@hugoalh/symmetric-crypto)
[![NPM: @hugoalh/symmetric-crypto](https://img.shields.io/npm/v/@hugoalh/symmetric-crypto?label=@hugoalh/symmetric-crypto&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/symmetric-crypto")](https://www.npmjs.com/package/@hugoalh/symmetric-crypto)

An ES (JavaScript & TypeScript) module to provide an easier symmetric crypto.

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.34.0 / >= v1.41.1 (For JSR Only)
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v16.13.0

## 🔰 Usage

### Via JSR With `node_modules`

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - Bun
      ```sh
      bunx jsr add @hugoalh/symmetric-crypto[@${Tag}]
      ```
    - NPM
      ```sh
      npx jsr add @hugoalh/symmetric-crypto[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/symmetric-crypto[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn dlx jsr add @hugoalh/symmetric-crypto[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/symmetric-crypto";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via JSR With Specifier

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    import ... from "jsr:@hugoalh/symmetric-crypto[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With `node_modules`

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - NPM
      ```sh
      npm install @hugoalh/symmetric-crypto[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm add @hugoalh/symmetric-crypto[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn add @hugoalh/symmetric-crypto[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/symmetric-crypto";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script:
    ```ts
    import ... from "npm:@hugoalh/symmetric-crypto[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via Remote Import

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    /* Via GitHub Raw (Require Tag) */
    import ... from "https://raw.githubusercontent.com/hugoalh-studio/symmetric-crypto-es/${Tag}/mod.ts";
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

## 🧩 API

- ```ts
  class SymmetricCryptor {
    decrypt(data: string): Promise<string>;
    decrypt(data: Uint8Array): Promise<Uint8Array>;
    encrypt(data: string): Promise<string>;
    encrypt(data: Uint8Array): Promise<Uint8Array>;
  }
  ```
- ```ts
  function createSymmetricCryptor(key: SymmetricCryptorKeyType, times?: number): Promise<SymmetricCryptor>;
  function createSymmetricCryptor(input: SymmetricCryptorKeyInput, times?: number): Promise<SymmetricCryptor>;
  function createSymmetricCryptor(inputs: (SymmetricCryptorKeyInput | SymmetricCryptorKeyType)[]): Promise<SymmetricCryptor>;
  ```
- ```ts
  interface SymmetricCryptorKeyInput {
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
  ```
- ```ts
  type SymmetricCryptorAlgorithmNameType = "AES-CBC" | "AES-CTR" | "AES-GCM";
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

## ✍️ Example

- ```ts
  const data = "Hello, world!\nFoo.\nBar.";
  const passphrase = "githubnode";
  const firstEncrypted = encrypt(data, passphrase);
  const secondEncrypted = encryptMultipleLine(data, passphrase);
  console.log(firstEncrypted);
  // "TIdMOTTeor6q79ilfKkcInvWqQ/U4UUK5oXRSXxWhTbNpL88i/QDly9NFCt1d6JwkDWJ0nkLGKwsWbcA6tM2yg=="

  console.log(secondEncrypted);
  /*
  `LO1uspz3yPXlbDdi20Xk5kYPc06kZO3h0SH6mN+gCI/+xTRpeanWPNat17ufGpxE
  NdLVDbUWDAeBK1MdXoO4rIbpBbwiCyaPU0ut8HOCCLXnidGM9EEbevuL8EGjQVSS
  nh3fuCzHOXWhtBLHuIZyiz5n9/Om0uPZdHdEikei8ydjnpaVLaCT2p78Uamxc3m1`
  */

  const firstDecrypted = decrypt(firstEncrypted, passphrase);
  const secondDecrypted = decryptMultipleLine(secondEncrypted, passphrase);
  console.log(firstDecrypted);
  // "Hello, world!\nFoo.\nBar."

  console.log(secondDecrypted);
  // "Hello, world!\nFoo.\nBar."
  ```
