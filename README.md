# Symmetric Crypto (NodeJS)

[⚖️ MIT](./LICENSE.md)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/symmetric-crypto-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/symmetric-crypto-nodejs)

|  | **Heat** | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/symmetric-crypto-nodejs) | [![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/symmetric-crypto-nodejs?label=&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/stargazers) \| ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/symmetric-crypto-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/symmetric-crypto-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/symmetric-crypto-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/symmetric-crypto-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/symmetric-crypto-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/symmetric-crypto) | ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/symmetric-crypto?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/symmetric-crypto/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/symmetric-crypto/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

A NodeJS module to provide an easier symmetric crypto.

This project is inspired from `symencdec` ([GitHub](https://github.com/nire0510/symencdec))([NPM](https://www.npmjs.com/package/symencdec)).

Symmetric crypto is a password based encryption and decryption, but this module has some addition improvements.

## 🔰 Begin

### Bun

> **🧪 Experimental:** Bun is still under development.

- **Target Version:** ^ v1.0.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/symmetric-crypto)
    ```sh
    bun add @hugoalh/symmetric-crypto[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/symmetric-crypto[@<Tag>]";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

### NodeJS

- **Target Version:** ^ v12.20.0 \|\| ^ v14.15.0 \|\| >= v16.13.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/symmetric-crypto)
    ```sh
    npm install @hugoalh/symmetric-crypto[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/symmetric-crypto";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

## 🧩 API (Excerpt)

> **ℹ️ Notice:** Documentation is included inside the script file.

### Class

- `SymmetricCryptor`

### Function

- `decrypt`
- `decryptMultipleLine`
- `encrypt`
- `encryptMultipleLine`

## ✍️ Example

- ```js
  import { decrypt, decryptMultipleLine, encrypt, encryptMultipleLine } from "@hugoalh/symmetric-crypto";
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
