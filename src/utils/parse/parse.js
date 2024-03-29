function clean(data) {
  return data.replace(/[^\x00-\x7F]/g, "");
}

const keywords = require("./keywords");
const { debug, error } = require("../log/all");
const rewords = [
  { name: "equals", val: "==" },
  { name: "isnot", val: "!=" }
];
const safeEval = require("safe-eval");
module.exports = function(fileData, file, cb) {
  const vars = require("./handlers/variables").output;
  var parsedData = "";
  const cleanData = clean(fileData);
  const lines = cleanData.split(/\r?\n/).filter(line => line != "");

  let index = 0;
  let cntr = 0;
  (function tick() {
    let line = lines[index];
    if (!line) return;
    line = line.split(/\/\/.*|\/\*[^]*\*\//g).join("");
    index++;
    if (line != "" && line != " " && line.split(" ").length > 0) {
      if (!line.endsWith(";") && !line.endsWith("; ")) {
        debug()("broken line:", line);
        return error.runtime(
          new Error("Unexpected end of line, semi-colon expected"),
          { full: line, index: line.length, file, place: index },
          true
        );
      }
      let ogLine = line;
      line = line.slice(0, -1);
      if (line.startsWith(" ")) {
        line = line.slice(1);
      }
      let words = line.split(" ");
      words.forEach((word, index) => {
        let reword = rewords.find(re => re.name == word);
        if (reword) {
          words[index] = reword.val;
        }
      });
      line = words.join(" ");
      let firstToken = words[0];
      let keyword = keywords[firstToken];
      if (keyword) {
        keyword(line, file, ogLine, index);
      } else {
        debug()("no def line:", firstToken);
        try {
          safeEval(line, vars);
        } catch (err) {
          error.runtime(err, {
            full: ogLine,
            index: 0,
            file,
            place: index
          });
        }
      }
    }
    if (++cntr > 1e3) {
      setImmediate(tick);
      cntr = 0;
    } else {
      process.nextTick(tick);
    }
  })();
  //   cleanData.split(";\n").forEach(line => {
  //     let words = line.split(/('.*?'|".*?"|\S+)/g);
  //     words = words.filter(x => x != " " && x != "");
  //     words.forEach(word => {
  //       debug("WORD", word);
  //       parsedData +=
  //         parsedData[parsedData.length - 1] != " " &&
  //         parsedData.length != 0 &&
  //         parsedData[parsedData.length - 1] != "\n" &&
  //         parsedData[parsedData.length - 1] != undefined
  //           ? " "
  //           : "";
  //       let finalWord =
  //         keywords[word] ||
  //         Object.entries(keywords).find(k => word.split(k[0]).length > 1)
  //           ? word
  //               .split(
  //                 Object.entries(keywords).find(
  //                   k => word.split(k[0]).length > 1
  //                 )[0]
  //               )
  //               .join(
  //                 Object.entries(keywords).find(
  //                   k => word.split(k[0]).length > 1
  //                 )[1]
  //               )
  //           : false;
  //       if (finalWord) {
  //         debug("KEY", finalWord);
  //         parsedData += finalWord;
  //       } else {
  //         debug("LEFT", word);
  //         parsedData += word;
  //       }
  //     });
  //     parsedData += "\n";
  //   });
  cb(parsedData);
};
