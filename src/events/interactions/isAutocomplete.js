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

    try {
        if (typeof command.autocomplete === "function") {
            await command.autocomplete(interaction, client, db, focusedOption);
        } else {
            // Set autocomplete command to command.autocomplete[toCamelCase(interaction.customId, seperator)] || command.button[interaction.customId];
            // Do this only if your button id is name1,name2 and you want your function named name1,name2() and name1Name2()
            // Currently speerator is on "_" for the example above it would be ","
            const autocompleteCommand =
                command.autocomplete[
                    toCamelCase(focusedOption.name, "_", "-")
                ] || command.autocomplete[focusedOption.name];

            let choices;
            if (typeof autocompleteCommand === "function") {
                choices = await autocompleteCommand(interaction, client, db);
            } else {
                choices = autocompleteCommand;
            }

            const filtered = choices.filter(choice =>
                choice
                    .toLowerCase()
                    .startsWith(focusedOption.value.toLowerCase())
            );
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice }))
            );
        }
    } catch (err) {
        // Can't really send them an error message here becuase every letter they type they would recieve one and woudln't really affect the experience
        console.error(err);
    }
};
