const toCamelCase = require("../../utils/toCamelCase.js");

module.exports = async function isAutocomplete(interaction, client, db) {
    const command = client.slashCommands.get(
        process.env.ENV !== "production"
            ? interaction.commandName.slice(0, -4)
            : interaction.commandName
    );

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    const focusedOption = interaction.options.getFocused(true);
    const camelCaseName = toCamelCase(focusedOption.name);

    let array;
    // If camel case try camel case else try  with "_" in name
    const autocompleteCommand =
        command.autocomplete[camelCaseName] ||
        command.autocomplete[focusedOption.name];

    try {
        if (typeof autocompleteCommand === "function") {
            array = await autocompleteCommand(interaction, client, db);
        } else {
            array = autocompleteCommand;
        }

        const filtered = array.filter(choice =>
            choice.toLowerCase().startsWith(focusedOption.value.toLowerCase())
        );
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice }))
        );
    } catch (err) {
        // Can't really send them an error message here becuase every letter they type they would recieve one and woudln't really affect the experience
        console.error(err);
    }
};
