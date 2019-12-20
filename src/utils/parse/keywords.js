module.exports = {
  set: require("./handlers/variables").run,
  log: require("./handlers/out").run,
  if: require("./handlers/if").run,
  while: require("./handlers/loop").run
};
