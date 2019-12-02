const variables = require("./variables").output;
const { error } = require("../../log/all");
module.exports.run = function(line, file, ogLine, lineNumber) {
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
  let getVar = variables.find(v => v.key == getValue);
  if (getVar) {
    return console.log(getVar.value);
  }
  try {
    variables.forEach(x => {
      global[x.key] = x.value;
    });
    let evaled = eval(getValue);
    console.log(evaled);
  } catch (err) {
    error.runtime(
      err,
      { full: ogLine, file, index: line.indexOf(getValue) },
      true,
      lineNumber
    );
  }
};
module.exports.output = variables;
