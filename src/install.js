const fs = require("file-system");
const path = require("path");
process.platform = "";
switch (process.platform) {
  case "linux":
    fs.writeFileSync(
      path.resolve(__dirname, "..", "lib", "nova"),
      fs.readFileSync(path.resolve(__dirname, "..", "lib", "nova-linux"))
    );
    break;
  case "win32":
    fs.writeFileSync(
      path.resolve(__dirname, "..", "lib", "nova"),
      fs.readFileSync(path.resolve(__dirname, "..", "lib", "nova-win"))
    );
    break;
  case "darwin":
    fs.writeFileSync(
      path.resolve(__dirname, "..", "lib", "nova"),
      fs.readFileSync(path.resolve(__dirname, "..", "lib", "nova-macos"))
    );
    break;
  default: {
    console.error("Err: " + " could not find platform.");
    process.exit(1);
  }
}
