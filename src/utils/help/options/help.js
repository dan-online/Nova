const chalk = require("chalk");
const width = process.stdout.columns;
module.exports.run = function(commands, cb) {
  const formatted = commands.map(command => {
    let aliases = command.conf.aliases.join(", ");
    let name = command.conf.name;
    let desc = command.conf.desc;
    let start = `${chalk.blueBright(name)} [${aliases}] `;
    let extraWidth = width / 2.5 - start.length;
    let dots = Array(extraWidth < 0 ? 0 : parseInt(extraWidth)).join(".");
    return `    ${start}${dots} ${desc}`;
  });
  console.log(`
Nova CLI, made by DanCodes

Usage: ${chalk.greenBright("nova [options] [file]")}

${formatted.join("\n")}
`);
};
module.exports.config = {
  name: "help",
  desc: "show this help command",
  aliases: ["--help", "-h"]
};
