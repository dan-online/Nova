module.exports = {
  error: require("./error"),
  debug: function() {
    return require("debug")("nova-debug:");
  }
};
