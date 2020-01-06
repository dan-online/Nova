const chalk = require("chalk");
module.exports.run = function(commands, cb) {
  console.log(
    chalk.blue("Nova ") +
      "version: " +
      chalk.blue(require("../../../../package.json").version)
  );
};
module.exports.config = {
  name: "version",
  desc: "enable verbose logging for deeper insight",
  aliases: ["--version", "-v"]
};
