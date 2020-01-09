module.exports.run = function(cb) {
  process.env.DEBUG = "nova-debug*";
  cb();
};
module.exports.config = {
  name: "verbose",
  desc: "enable verbose logging for deeper insight logging",
  aliases: ["--verbose", "-V"],
  usage: "nova -V/--verbose test.ns",
  callback: true
};
