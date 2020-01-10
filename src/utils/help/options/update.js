const updater = require("../../../install");
const { error } = require("../../log/all");
const chalk = require("chalk");
module.exports.run = function(cb, args, commands) {
  if (!args) return error.internal("No version specified, run: nova -h update");
  const version = "v" + args.join(" ");
  updater(
    function(release) {
      return release.tag_name == version;
    },
    function(err, res) {
      if (err) error.internal(err.message, true);
      if (!res) error.internal("No version found for: " + version, true);
      console.log(
        chalk.blueBright("Nova") + " " + version + " installed successfully!"
      );
    }
  );
};
module.exports.config = {
  name: "update",
  desc: "update to the newest version",
  aliases: ["--update", "-u"],
  usage: "nova --update/-u"
};
