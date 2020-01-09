const parseFile = require("../../parse/parse");
const runData = require("../../run/run");
const debug = require("../../log/all").debug;

module.exports.run = function(cb, args) {
  const code = args.join(" ");
  parseFile(code, "eval.ns", function(output) {
    debug()("parse finished");
    runData(output);
  });
};
module.exports.config = {
  name: "eval",
  desc: "evaluate code from the command line",
  aliases: ["--eval", "-e"],
  usage: "nova -e/--eval \"output.log('Hello world!');\""
};
