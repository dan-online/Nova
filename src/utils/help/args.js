const { error } = require("../log/all");
const options = [];

[
  require("./options/help"),
  require("./options/verbose"),
  require("./options/version"),
  require("./options/eval")
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
    const toRun = options.filter(opt =>
      opt.conf.aliases.find(alias => args.find(a => a == alias))
    );
    if (!toRun || toRun.length < 1) {
      if (file) return cb();
      return error.internal(
        "Invalid option passed in command line. To learn more try: nova -h"
      );
    }
    args = args.filter(
      a => !options.find(o => o.conf.aliases.find(al => al == a))
    );
    args = args.length < 1 ? null : args;
    toRun.sort((b, a) => (a.conf.callback ? 1 : 0) - (b.conf.callback ? 1 : 0));
    let index = -1;
    (function next() {
      index++;
      if (!toRun[index]) return;
      setImmediate(() => {
        toRun[index].run(next, args, options);
      });
    })();
  })();
};
