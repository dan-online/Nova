var variables = {
  args: process.argv.slice(
    process.argv.indexOf(process.argv.find(x => x.endsWith(".ns")))
  ),
  platform: process.platform,
  process: { pid: process.pid, exit: process.exit },
  Nova: {
    directory: process.cwd(),
    node: process.version,
    version: require("../../../../package.json").version
  },
  startTimer: setTimeout,
  startInterval: setInterval,
  stopTimer: clearTimeout,
  stopInterval: clearInterval,
  include: require,
  output: console
};
variables["global"] = variables;
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
    let evaled = safeEval(value, variables);
    variables[key] = evaled;
  } catch (err) {
    error.runtime(
      err,
      { full: ogLine, index: 0, file, place: lineNumber },
      true
    );
  }
};
module.exports.output = variables;
