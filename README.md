<p align="center">
<img width="300" src="https://github.com/dan-online/Nova/raw/master/build/round.png">
<h1 align="center">Welcome to Nova 👋 (Beta)</h1>
<p align="center">
<a href="">
    <img alt="Nova NPM downloads" src="https://img.shields.io/npm/dt/nova">
</a>
<a href="">
    <img alt="Nova Languages" src="https://img.shields.io/github/languages/top/dan-online/nova">
</a>
<a href="">
    <img alt="Nova Code Size" src="https://img.shields.io/github/languages/code-size/dan-online/nova">
</a>
<a href="LICENSE.md" target="_blank">
    <img alt="Nova License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</a>
<a href="package.json" target="_blank">
    <img alt="Nova Version" src="https://img.shields.io/github/package-json/v/dan-online/nova">
</a>
<a href="https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dan-online/Nova&amp;utm_campaign=Badge_Grade"><img alt="Nova Codacy" src="https://api.codacy.com/project/badge/Grade/ec863653fbde4d38889e471a8508fb72"/></a>
</p>
</p>

## Table of Contents

- [About](#About)
- [Usage](#usage)
  - [Install](#install)
  - [Run](#run)
  - [Keywords](#keywords)

# About

Nova is an opensource programming language built on node. The purpose of Nova is to make a pure psuedo-code language that is the perfect introduction into computer science. Completely built on [node](https://github.com/nodejs/node) v12 and connected to NPM packages, Nova is optimized for running on mac, linux and windows!

To get started go to [usage](#usage) and start your Nova journey today.

# Usage

## Install

```bash
npm i -g cli-nova
```

## Run

```bash
nova [options] [file]
```

## Example runs

```bash
nova test.ns
```

```bash
nova --verbose test.ns
```

## Examples

```javascript
set variable as "hello"; // "Strings"
log variable; // Logging

set two as 1 + 1; // Numbers
set array as [1,2,3,4,5];

set chalk as include("chalk"); // Npm integration
log chalk.red("Red text"); // Logs red

log 12 / 2 % 2 + 1; // Logs 3

if two equals 2 then log "two is equal to 2";

if two isnot 2 then log "won't be logged" else log "two is not not equal to 2";

```

## Keywords

### Variables

For variables we use two keywords, "set" and "as". All variable values are evaluated on initiation and stored in memory. They can be referenced at any time throughout the code and are global.

```javascript
set hello as "world1";
output.log("hello " + hello.slice(0, -1)); // output: hello world
```

Variables can also be set to npm modules and other files. Modules can be installed using [npm](https://npmjs.org).

```javascript
set chalk as include("chalk");
set path as include("path");
set redText as chalk.red("red text");

output.log(redText);

set package as include(path.resolve("./package.json"));
output.log("Running v" + package.version);

```

## Author

👤 **DanCodes <dan@dancodes.online>**

- Website: https://dancodes.online
- Github: [@dan-online](https://github.com/dan-online)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/dan-online/Nova/issues).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/mayorchano">
<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## 📝 License

Copyright © 2020 [DanCodes <dan@dancodes.online>](https://github.com/dan-online).<br />
This project is [MIT](LICENSE.md) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
