# Symmetric Crypto (NodeJS Edition)

[`SymmetricCrypto.NodeJS`](https://github.com/hugoalh-studio/symmetric-crypto-nodejs) - A NodeJS module to provide an easier symmetric crypto.

[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/symmetric-crypto-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/symmetric-crypto-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/symmetric-crypto-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/symmetric-crypto-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/discussions)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/symmetric-crypto-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hugoalh-studio/symmetric-crypto-nodejs?label=Forks&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/network/members)
![GitHub Languages](https://img.shields.io/github/languages/count/hugoalh-studio/symmetric-crypto-nodejs?label=Languages&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/symmetric-crypto-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh-studio/symmetric-crypto-nodejs)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/g/hugoalh-studio/symmetric-crypto-nodejs?label=Alerts&logo=lgtm&logoColor=ffffff&style=flat-square)
![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/g/hugoalh-studio/symmetric-crypto-nodejs?label=Grade&logo=lgtm&logoColor=ffffff&style=flat-square)](https://lgtm.com/projects/g/hugoalh-studio/symmetric-crypto-nodejs)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=brightgreen&style=flat-square)](./LICENSE.md)

| **Release** | **Latest** | **Pre** |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/releases) ![](https://img.shields.io/github/downloads/hugoalh-studio/symmetric-crypto-nodejs/total?label=%20&style=flat-square) | ![](https://img.shields.io/github/release/hugoalh-studio/symmetric-crypto-nodejs?sort=semver&label=%20&style=flat-square) (![](https://img.shields.io/github/release-date/hugoalh-studio/symmetric-crypto-nodejs?label=%20&style=flat-square)) | ![](https://img.shields.io/github/release/hugoalh-studio/symmetric-crypto-nodejs?include_prereleases&sort=semver&label=%20&style=flat-square) (![](https://img.shields.io/github/release-date-pre/hugoalh-studio/symmetric-crypto-nodejs?label=%20&style=flat-square)) |
| [**NPM**](https://www.npmjs.com/package/@hugoalh/symmetric-crypto) ![](https://img.shields.io/npm/dt/@hugoalh/symmetric-crypto?label=%20&style=flat-square) | ![](https://img.shields.io/npm/v/@hugoalh/symmetric-crypto/latest?label=%20&style=flat-square) | ![](https://img.shields.io/npm/v/@hugoalh/symmetric-crypto/pre?label=%20&style=flat-square) |

## 📝 Description

*This project is inspired from "`symencdec`" ([GitHub](https://github.com/nire0510/symencdec))([NPM](https://www.npmjs.com/package/symencdec)).*

Symmetric crypto is a password based encryption and decryption, but this module has some addition improvements.

## 📚 Documentation

*For the official documentation, please visit [GitHub Repository Wiki](https://github.com/hugoalh-studio/symmetric-crypto-nodejs/wiki).*

### Getting Started (Excerpt)

NodeJS (>= v14.15.0) & NPM (>= v6.14.8):

```sh
> npm install @hugoalh/symmetric-crypto
```

### API (Excerpt)

- `decrypt(data, passphrase)`
- `decryptMultipleLine(data, passphrase)`
- `encrypt(data, passphrase)`
- `encryptMultipleLine(data, passphrase)`

### Example (Excerpt)

```js
const symmetricCrypto = require("@hugoalh/symmetric-crypto");

let data = "Hello, world!\nFoo.\nBar.",
    passphrase = "githubnode";
let firstEncrypted = symmetricCrypto.encrypt(data, passphrase),
    secondEncrypted = symmetricCrypto.encryptMultipleLine(data, passphrase);
console.log(firstEncrypted);// "awpojpwojqmrmklmklmkljicvjifjogjotrj"
console.log(secondEncrypted);
/*
spjerpawakmsfnklasklfnkljljkasjkdlaz
sdjfljslejifklejrlkmslkfmklpmqhnoubd
psdofipskpdokfepkasdpoaiwopejkqmatyn
*/
let firstDecrypted = symmetricCrypto.decrypt(firstEncrypted, passphrase),
    secondDecrypted = symmetricCrypto.decryptMultipleLine(secondEncrypted, passphrase);
console.log(firstDecrypted);// "Hello, world!\nFoo.\nBar."
console.log(secondDecrypted);// "Hello, world!\nFoo.\nBar."
```
