const { error } = require("../log/all");
module.exports = function(code) {
  eval(code);
};
/*
  old system, unused
*/
