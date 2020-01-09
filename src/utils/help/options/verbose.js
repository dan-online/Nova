module.exports.run = function(commands, cb) {
  process.env.DEBUG = "*";
  cb();
};
module.exports.config = {
  name: "verbose",
  desc: "enable verbose logging for deeper insight",
  aliases: ["--verbose", "-V"]
};
