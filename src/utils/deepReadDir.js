const fs = require("fs");
const path = require("path");

module.exports = function deepReadDir(dirName, ...dirExcludesRegexes) {
    let files = [];
    fs.readdirSync(dirName, { withFileTypes: true }).forEach(item => {
        for (const dirExcludeRegex of dirExcludesRegexes) {
            if (new RegExp(dirExcludeRegex).test(item.name)) return;
        }

        if (item.isDirectory()) {
            files = [...files, ...deepReadDir(path.join(dirName, item.name))];
        } else {
            files.push(path.join(dirName, item.name));
        }
    });
    return files;
};
