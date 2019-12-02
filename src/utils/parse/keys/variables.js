var variables = [];
const { error } = require("../../log/all");
module.exports.run = function(line, file, ogLine, lineNumber) {
  const key = line
    .split("set")
    .join("")
    .split("as")[0]
    .split(" ")[1];
  const value = line.split("as ")[1];
  if (!key || key == "" || !value)
    return error.runtime(
      new Error("Unexpected end of variable declaration"),
      {
        full: ogLine,
        index: !key ? ogLine.indexOf("set") + 3 : ogLine.indexOf("as") + 3,
        file
      },
      true,
      lineNumber
    );
  try {
    variables.forEach(x => {
      global[x.key] = x.value;
    });
    let evaled = eval(value);
    variables.push({ key, value: evaled });
  } catch (err) {
    console.log(err);
    error.runtime(err, { full: ogLine, index: 0, file }, true, lineNumber);
  }
};
module.exports.output = variables;
