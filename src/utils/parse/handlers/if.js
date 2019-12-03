const variables = require("./variables").output;
const { error } = require("../../log/all");
module.exports.run = function(line, file, ogLine, lineNumber) {
  const getValue = line.split("if ")[1].split(" then")[0];
  if (!getValue)
    return error.runtime(
      new Error("Unexpected end of if statement"),
      {
        full: ogLine,
        file,
        index: 2,
        place: lineNumber
      },
      true
    );
  try {
    variables.forEach(x => {
      global[x.key] = x.value;
    });
    let evaled = eval(getValue);
    if (evaled) {
      let then = line.split("then ")[1].split("else")[0];
      if (then) {
        require("../parse.js")(then + ";", file, () => {});
      } else {
        error.runtime(
          new Error("Missing then keyword in if statement"),
          {
            full: ogLine,
            file,
            index: 0,
            place: lineNumber
          },
          true
        );
      }
    } else {
      let after = line.split("else ")[1];
      if (after) {
        require("../parse.js")(after + ";", file, () => {});
      }
    }
  } catch (err) {
    return error.runtime(
      err,
      {
        full: ogLine,
        file,
        index: 0,
        place: lineNumber
      },
      true
    );
  }
};
module.exports.output = variables;
