module.exports = function toCamelCase(word, separator = " ") {
    return word
        .split(separator)
        .map((word, index) =>
            index === 0
                ? word.toLowerCase()
                : word[0].toUpperCase() + word.slice(1)
        )
        .join("");
};
