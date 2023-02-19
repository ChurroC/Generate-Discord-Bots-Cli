const toCamelCase = require("../../utils/toCamelCase.js");
const interactionError = require("../../utils/interactionError.js");

module.exports = async function isChatInputCommand(interaction, client, db) {
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

    try {
        if (typeof command.execute === "function") {
            await command.execute(interaction, client, db);
        } else {
            // Set autocomplete command to command.autocomplete[toCamelCase(interaction.customId, seperator)] || command.button[interaction.customId];
            // Do this only if your button id is name1,name2 and you want your function named name1,name2() and name1Name2()
            // Currently speerator is on "_" for the example above it would be ","
            const chatCommand =
                command.execute[
                    toCamelCase(interaction.options.getSubcommand(), "_")
                ] || command.execute[interaction.commandName];
            await chatCommand(interaction, client, db);
        }
    } catch (err) {
        console.error(err);
        interactionError(
            interaction,
            "There was an error trying to execute that command!"
        );
    }
};
