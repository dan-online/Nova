const chalk = require("chalk");
module.exports.run = function() {
  console.log(
    chalk.blue("Nova ") +
      "version: " +
      chalk.blue(require("../../../../package.json").version)
  );
};
module.exports.config = {
  name: "version",
  desc: "view the version of Nova",
  aliases: ["--version", "-v"],
  usage: "nova --version/-v"
};
