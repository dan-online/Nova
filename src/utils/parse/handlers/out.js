const variables = require("./variables").output;
const { error, debug } = require("../../log/all");
const safeEval = require("safe-eval");
module.exports.run = function(line, file, ogLine, lineNumber) {
  debug()("run: output");
  const getValue = line.split("log ")[1];
  if (!getValue)
    return error.runtime(
      new Error("Unexpected end of log function"),
      {
        full: ogLine,
        file,
        index: 3,
        place: lineNumber
      },
      true
    );
  try {
    let evaled = safeEval(getValue, variables);
    console.log(evaled);
  } catch (err) {
    error.runtime(
      err,
      { full: ogLine, file, index: line.indexOf(getValue), place: lineNumber },
      true,
      lineNumber
    );
  }
};
module.exports.output = variables;
