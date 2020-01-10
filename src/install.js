const fs = require("file-system");
const path = require("path");
const downloadRelease = require("download-github-release");

const user = "dan-online";
const repo = "nova";
const tmpdir = fs.realpathSync(path.resolve(require("os").tmpdir()));
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
console.log(
  "Moving from",
  path.resolve(tmpdir, "nova-" + platform),
  "to",
  path.resolve(outputdir, "nova")
);
downloadRelease(user, repo, tmpdir, filterRelease, filterAsset, leaveZipped)
  .then(function() {
    try {
      fs.copyFileSync(
        path.resolve(tmpdir, "nova-" + platform),
        path.resolve(outputdir, "nova")
      );
    } catch (err) {
      throw new Error("Unable to copy file to new location");
    }
  })
  .catch(function(err) {
    throw new Error("Unable to download due to: " + err.message);
  });
