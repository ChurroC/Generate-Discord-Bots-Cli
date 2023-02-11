const fs = require("fs");
const path = require("path");

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
