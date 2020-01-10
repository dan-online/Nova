const fs = require("file-system");
const path = require("path");
const downloadRelease = require("download-github-release");

const user = "dan-online";
const repo = "nova";
const tmpdir = fs.realpathSync(require("os").tmpdir());
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
function Run(filter = filterRelease, callback) {
  downloadRelease(user, repo, tmpdir, filter, filterAsset, leaveZipped)
    .then(function() {
      try {
        fs.copyFileSync(
          path.resolve(tmpdir, "nova-" + platform),
          path.resolve(outputdir, "nova")
        );
        callback(null, "Finished");
      } catch (err) {
        callback(
          new Error("Unable to copy file to new location: " + err.message)
        );
      }
    })
    .catch(function(err) {
      callback(new Error("Unable to download due to: " + err.message));
    });
}

if (process.argv.find(a => a == "--preinstall"))
  Run(null, err => {
    throw err;
  });

module.exports = Run;
