const { error } = require("../log/all");
const options = [];

[
  require("./options/help"),
  require("./options/verbose"),
  require("./options/version")
].forEach(file => {
  options.push({
    run: file.run,
    conf: file.config
  });
});

module.exports = function(args, file, cb) {
  (function check() {
    if (options.length < 1) return setImmediate(check);
    args = args.slice(args.indexOf(args.find(x => x.endsWith("/nova.js"))) + 1);
    args = args.filter(x => !file || !file.endsWith(x));
    if (args.length < 1) {
      if (!file) args = ["-h"];
      else return cb();
    }
    const arg = options.find(opt =>
      opt.conf.aliases.find(alias => args.find(a => a == alias))
    );
    if (!arg) {
      if (file) return cb();
      return error.internal(
        "Invalid option passed in command line. To learn more try: nova -h"
      );
    }
    arg.run(options, cb);
  })();
};
