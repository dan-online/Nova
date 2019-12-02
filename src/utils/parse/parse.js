function clean(data) {
  return data.replace(/[^\x00-\x7F]/g, "");
}

const keywords = require("./keywords");
const { debug, error } = require("../log/all");

module.exports = function(fileData, file, cb) {
  var parsedData = "";
  const cleanData = clean(fileData);
  const lines = cleanData.split(/\r?\n/);
  lines.forEach((line, index) => {
    index++;
    if (line == "") return;
    if (!line.endsWith(";"))
      return error.runtime(
        new Error("Unexpected end of line, semi-colon expected"),
        { full: line, index: line.length, file },
        true,
        index
      );
    let ogLine = line;
    line = line.slice(0, -1);
    let keyword = keywords[line.split(" ")[0]];
    if (keyword) {
      keyword(line.split(";")[0], file, ogLine, index);
    }
  });
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
  debug("PARSE", parsedData);
  cb(parsedData);
};
