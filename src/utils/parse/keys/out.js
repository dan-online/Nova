const variables = require("./variables").output;
const { error } = require("../../log/all");
module.exports.run = function(line, file, ogLine) {
  const getValue = line.split("log ")[1];
  if (!getValue)
    return error.runtime(new Error("Unexpected end of log function"), {
      full: ogLine,
      file,
      index: 3
    });
  let getVar = variables.find(v => v.key == getValue);
  if (getVar) {
    console.log(getVar.value);
  }
};
module.exports.output = variables;
