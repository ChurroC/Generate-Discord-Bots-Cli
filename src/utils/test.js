function toCamelCase(word, ...separator) {
    (separator.length !== 0 ? separator : [" "]).forEach(element => {
        word = word
            .split(element)
            .map((word, index) => {
                return index === 0
                    ? word[0].toLowerCase() + word.slice(1)
                    : word[0].toUpperCase() + word.slice(1);
            })
            .join("");
    });
    return word;
}

const cool = "hello_world-ddd";
console.log(toCamelCase(cool));
