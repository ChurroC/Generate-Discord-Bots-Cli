const fs = require("fs").promises;

module.exports = () => {
    const oldConsoleError = console.error;
    console.error = (...logs) => {
        oldConsoleError(...logs);
        logs.forEach(log => {
            fs.writeFile("./error.log", `${new Date().getTime()}: ${log instanceof Error ? log.stack : log}\n`, {
                flag: "a+",
            });
        });
    };
};
