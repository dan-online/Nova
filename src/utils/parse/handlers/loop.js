const variables = require("./variables").output;
const { error } = require("../../log/all");
module.exports.run = function(line, file, ogLine, lineNumber) {
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
      variables.forEach(x => {
        global[x.key] = x.value;
      });
      let evaled = eval(getValue);
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
