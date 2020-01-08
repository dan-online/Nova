const variables = require("./variables").output;
const { error, debug } = require("../../log/all");
const safeEval = require("safe-eval");
module.exports.run = function(line, file, ogLine, lineNumber) {
  debug()("run: loop");
  const getValue = line.split("while ")[1].split(" then")[0];
  const execValue = line
    .split("then ")[1]
    .split("{")[1]
    .split("}")[0];
  if (!getValue || !execValue)
    return error.runtime(
      new Error("Unexpected end of while loop"),
      {
        full: ogLine,
        file,
        index: !getValue ? 5 : ogLine.length - 1,
        place: lineNumber
      },
      true
    );

  try {
    (function loop() {
      let evaled = safeEval(getValue, variables);
      if (evaled) {
        require("../parse.js")(execValue.split(";").join(";\n"), file, data => {
          loop();
        });
      }
    })();
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
