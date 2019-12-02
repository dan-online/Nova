process.env.NODE_ENV = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : process.pkg
  ? "production"
  : "development";

const { log, error, debug } = require("./utils/log/all");
const checkFile = require("./utils/checks/file");
const parseFile = require("./utils/parse/parse");
const runData = require("./utils/run/run");
const package = require("../package");

debug(process.env);

checkFile(process.argv, function(err, fileData, fileName) {
  if (!fileData && !err) return console.log("Nova v" + package.version);
  if (err) return error.internal(err, true);
  parseFile(fileData, fileName, function(output) {
    runData(output);
  });
});
