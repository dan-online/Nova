var variables = [
  { key: "args", value: process.argv.slice(process.argv.indexOf("./test.ns")) },
  { key: "platform", value: process.platform },
  { key: "process", value: { pid: process.pid, exit: process.exit } },
  { key: "Nova", value: { directory: process.cwd() } },
  { key: "startTimer", value: setTimeout },
  { key: "startInterval", value: setInterval },
  { key: "stopTimer", value: clearTimeout },
  { key: "stopInterval", value: clearInterval }
];
const { error, debug } = require("../../log/all");
const safeEval = require("safe-eval");
module.exports.run = function(line, file, ogLine, lineNumber) {
  debug()("run: var declaration");
  const keywords = require("../keywords");
  const key = line
    .split("set")
    .join("")
    .split("as")[0]
    .split(" ")[1];
  const value = line.split("as ")[1];
  if (!key || key == "" || !value || keywords[key])
    return error.runtime(
      new Error(
        "Unexpected " +
          (!keywords[key] ? "end of" : "keyword in") +
          " variable declaration"
      ),
      {
        full: ogLine,
        index: !keywords[key]
          ? !key
            ? ogLine.indexOf("set") + 3
            : ogLine.indexOf("as") + 3
          : ogLine.indexOf(key),
        file,
        place: lineNumber
      },
      true
    );
  try {
    let evaled = safeEval(getValue, variables);
    if (variables.find(v => v.key == key)) {
      variables.splice(variables.indexOf(variables.find(v => v.key == key)), 1);
    }
    variables.push({ key, value: evaled });
  } catch (err) {
    console.log(err);
    error.runtime(
      err,
      { full: ogLine, index: 0, file, place: lineNumber },
      true
    );
  }
};
module.exports.output = variables;
