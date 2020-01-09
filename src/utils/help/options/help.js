const chalk = require("chalk");
const width = process.stdout.columns;
const { error } = require("../../log/all");
const package = require("../../../../package.json");
module.exports.run = function(cb, args, commands) {
  if (!args) {
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
${chalk.blueBright("Nova")} v${package.version}

Usage: ${chalk.greenBright("nova [options] [file]")}
Help:  ${chalk.greenBright("nova -h [command name]")}

${formatted.join("\n")}
`);
    return;
  }
  const arg = args.join(" ");
  const cmd = commands.find(command => args.join(" ") == command.conf.name);
  if (!cmd) return error.internal("No command found for " + arg);
  console.log(`
${chalk.blueBright("Nova")} command ${chalk.blueBright(cmd.conf.name)}

Ex Usage: ${chalk.greenBright(cmd.conf.usage)}  
Descript: ${chalk.greenBright(cmd.conf.desc)}
`);
};
module.exports.config = {
  name: "help",
  desc: "show this help command or view specific help",
  aliases: ["--help", "-h"],
  usage: "nova -h [command name]"
};
