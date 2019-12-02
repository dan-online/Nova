const fs = require("file-system");
const path = require("path");
module.exports = function(args, cb) {
  let files = args.filter(x => x.split(".").length > 1);
  let filename = files.find(x => x.endsWith(".ns")) || "";
  if (!files && !filename) return cb(null, null);
  if (!filename.endsWith(".ns")) return cb("File must be a valid nova file.");
  let filePath = path.resolve(process.cwd(), filename);
  fs.exists(filePath, function(exists) {
    if (!exists) return cb("No file found under " + filename);
    fs.readFile(filePath, function(err, data) {
      if (err) return cb(err);
      return cb(null, data.toString(), filePath);
    });
  });
};
