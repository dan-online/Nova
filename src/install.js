const fs = require("file-system");
const path = require("path");
const downloadRelease = require("download-github-release");

const user = "dan-online";
const repo = "nova";
const outputdir = path.resolve(__dirname, "..", "lib");
const leaveZipped = false;
const platform =
  process.platform == "darwin"
    ? "macos"
    : process.platform == "linux"
    ? "linux"
    : "win.exe";

function filterRelease(release) {
  return release.prerelease === false;
}

function filterAsset(asset) {
  return asset.name.indexOf(platform) >= 0;
}
try {
  fs.unlinkSync(path.resolve(outputdir, "nova"));
  fs.unlinkSync(path.resolve(outputdir, "nova-" + platform));
} catch (e) {}
downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped)
  .then(function() {
    try {
      fs.copyFileSync(
        path.resolve(outputdir, "nova-" + platform),
        path.resolve(outputdir, "nova")
      );
    } catch (err) {
      throw new Error("Unable to copy file to new location");
    }
  })
  .catch(function(err) {
    throw err;
  });
