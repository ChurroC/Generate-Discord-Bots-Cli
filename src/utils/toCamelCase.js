module.exports = (word, ...separators) => {
    (separators.length !== 0 ? separators : [" "]).forEach(separator => {
        word = word
            .split(separator)
            .map((word, index) => {
                return index === 0
                    ? word[0].toLowerCase() + word.slice(1)
                    : word[0].toUpperCase() + word.slice(1);
            })
            .join("");
    });
    return word;
};
