const exec = require("child_process").exec;

describe("Nova tests", () => {
  it("Variables", cb => {
    exec("node ./src/nova.js ./src/tests/scripts/variables.ns", function(
      err,
      out
    ) {
      if (err) return cb(err);
      if (out.split("\n").join(",") != "1,hi,2,2,8,") {
        cb(new Error("Incorrect output: " + out.split("\n").join(",")));
      } else {
        cb();
      }
    });
  });
  it("Log", cb => {
    exec("node ./src/nova.js ./src/tests/scripts/log.ns", function(err, out) {
      if (err) return cb(err);
      if (out.split("\n").join(",") != "string,1,5,10,hiya, you,hiya,") {
        cb(new Error("Incorrect output: " + out.split("\n").join(",")));
      } else {
        cb();
      }
    });
  });
  it("If", cb => {
    exec("node ./src/nova.js ./src/tests/scripts/if.ns", function(err, out) {
      if (err) return cb(err);
      out = out.split("\n")[0];
      if (out != "true") {
        cb(new Error("Incorrect output: " + out));
      } else {
        cb();
      }
    });
  });
});
