const chalk = require("chalk");
module.exports.internal = function(error, fatal) {
  console.error(chalk.red("nova:"), error);
  if (fatal) return process.exit(1);
};

module.exports.runtime = function(err, line, fatal) {
  console.error(line.full);
  let x = 0;
  let spaces = "";
  while (x <= process.stdout.columns - 1) {
    if (line.index == x) {
      spaces += "^";
    } else {
      spaces += " ";
    }
    x++;
  }
  console.log(spaces);
  module.exports.internal(
    `${err.name}: ${err.message}\n         at ${line.file}:${
      line.place
    }:${line.index + 1}${err.stack
      .split("Error: " + err.message)[1]
      .split("    ")
      .join("         ")}`
  );
  //console.error(err.stack);
  if (fatal) return process.exit(1);
};
