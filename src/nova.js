process.env.NODE_ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : process.pkg
  ? "production"
  : "development";

const { error, debug } = require("./utils/log/all");
const checkFile = require("./utils/checks/file");
const parseFile = require("./utils/parse/parse");
const runData = require("./utils/run/run");
const argsCheck = require("./utils/help/args");

checkFile(process.argv, function(err, fileData, fileName) {
  argsCheck(process.argv, fileName, function() {
    debug()("args finished");
    if (err) return error.internal(err, true);
    parseFile(fileData, fileName, function(output) {
      debug()("parse finished");
      runData(output);
    });
  });
});
