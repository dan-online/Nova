var variables = [
  { key: "args", value: process.argv.slice(process.argv.indexOf("./test.ns")) },
  { key: "platform", value: process.platform }
];
const { error } = require("../../log/all");
module.exports.run = function(line, file, ogLine, lineNumber) {
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
    variables.forEach(x => {
      global[x.key] = x.value;
    });
    let evaled = eval(value);
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
