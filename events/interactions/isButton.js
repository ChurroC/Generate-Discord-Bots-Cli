const toCamelCase = require("../../utils/toCamelCase.js");
const interactionError = require("../../utils/interactionError.js");

module.exports = async function isButton(interaction, client, db) {
    const command = client.slashCommands.get(
        process.env.ENV !== "production"
            ? interaction.message.interaction.commandName.slice(0, -4)
            : interaction.message.interaction.commandName
    );

    if (!command) {
        console.error(
            `No button for ${interaction.message.interaction.commandName} was found.`
        );
        return;
    }

    try {
        if (typeof command.button === "function") {
            await command.button(interaction, client, db, interaction.customId);
        } else {
            // Set button command to command.button[toCamelCase(interaction.customId, seperator)] || command.button[interaction.customId];
            // Do this only if your button id is name1_name2 and you want your function named name1_name2() and name1Name2()
            // Also set your seperator to whatever seperates each name1 and names2 in this example it would be "_"
            const buttonCommand =
                command.button[toCamelCase(interaction.customId)];
            await buttonCommand(interaction, client, db);
        }
    } catch (err) {
        console.error(err);
        interactionError(
            interaction,
            "There was an error trying to run the button!"
        );
    }
};
