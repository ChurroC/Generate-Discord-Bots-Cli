const fs = require("fs").promises;

module.exports = async function LogError() {
    const oldConsoleError = console.error;
    console.error = (...logs) => {
        oldConsoleError(...logs);
        fs.writeFile(
            "./error.log",
            `${new Date().toLocaleString()}: ${logs.join(" ")}\n`,
            { flag: "a+" }
        );
    };
};
