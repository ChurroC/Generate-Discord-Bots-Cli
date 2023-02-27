const fs = require("fs");
const path = require("path");

// Exclude dirs and files should have regexes
// Or have a sorting function as a parameter
// For ending with fileName.subcommand.js those shoudl not be command and should be subcommands
module.exports = function deepReadDir(dirName) {
    let files = [];
    fs.readdirSync(dirName, { withFileTypes: true }).forEach(item => {
        if (item.isDirectory()) {
            files = [...files, ...deepReadDir(path.join(dirName, item.name))];
        } else {
            files.push(path.join(dirName, item.name));
        }
    });
    return files;
};
