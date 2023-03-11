# Symmetric Crypto (NodeJS)

[`SymmetricCrypto.NodeJS`](https://github.com/hugoalh-studio/symmetric-crypto-nodejs)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/symmetric-crypto-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/symmetric-crypto-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/symmetric-crypto-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/symmetric-crypto-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/symmetric-crypto-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/symmetric-crypto-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/symmetric-crypto-nodejs)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/symmetric-crypto-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/symmetric-crypto-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/symmetric-crypto-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/symmetric-crypto-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/symmetric-crypto-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/symmetric-crypto) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/symmetric-crypto?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/symmetric-crypto/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/symmetric-crypto/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

## 📝 Description

A NodeJS module to provide an easier symmetric crypto.

*This project is inspired from `symencdec` ([GitHub](https://github.com/nire0510/symencdec))([NPM](https://www.npmjs.com/package/symencdec)).*

Symmetric crypto is a password based encryption and decryption, but this module has some addition improvements.

## 📚 Documentation (Excerpt)

For the full documentation, please visit the [GitHub Repository Wiki](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/wiki).

### Getting Started

#### Install

- NodeJS ^ v12.20.0 || ^ v14.15.0 || >= v16.13.0

```sh
npm install @hugoalh/symmetric-crypto
```

#### Use

```js
/* Either */
import { ... } from "@hugoalh/symmetric-crypto";// Named Import
import * as symmetricCrypto from "@hugoalh/symmetric-crypto";// Namespace Import
import symmetricCrypto from "@hugoalh/symmetric-crypto";// Default Import
```

### API

#### Class

- `SymmetricCryptor`

#### Function

- `decrypt`
- `decryptMultipleLine`
- `encrypt`
- `encryptMultipleLine`

### Example

```js
let data = "Hello, world!\nFoo.\nBar.";
let passphrase = "githubnode";
let firstEncrypted = encrypt(data, passphrase);
let secondEncrypted = encryptMultipleLine(data, passphrase);
console.log(firstEncrypted);
// "TIdMOTTeor6q79ilfKkcInvWqQ/U4UUK5oXRSXxWhTbNpL88i/QDly9NFCt1d6JwkDWJ0nkLGKwsWbcA6tM2yg=="

console.log(secondEncrypted);
/*
`LO1uspz3yPXlbDdi20Xk5kYPc06kZO3h0SH6mN+gCI/+xTRpeanWPNat17ufGpxE
NdLVDbUWDAeBK1MdXoO4rIbpBbwiCyaPU0ut8HOCCLXnidGM9EEbevuL8EGjQVSS
nh3fuCzHOXWhtBLHuIZyiz5n9/Om0uPZdHdEikei8ydjnpaVLaCT2p78Uamxc3m1`
*/

let firstDecrypted = decrypt(firstEncrypted, passphrase);
let secondDecrypted = decryptMultipleLine(secondEncrypted, passphrase);
console.log(firstDecrypted);
// "Hello, world!\nFoo.\nBar."

console.log(secondDecrypted);
// "Hello, world!\nFoo.\nBar."
```
