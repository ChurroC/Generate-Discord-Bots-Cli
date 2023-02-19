const toCamelCase = require("../../utils/toCamelCase.js");
const interactionError = require("../../utils/interactionError.js");

module.exports = async function isContext(interaction, client, db) {
    const command = client.slashCommands.get(
        process.env.ENV !== "production"
            ? interaction.commandName.slice(0, -4)
            : interaction.commandName
    );

    if (!command) {
        console.error(
            `No button for ${interaction.message.interaction.commandName} was found.`
        );
        return;
    }

    try {
        await command.execute(
            interaction,
            client,
            db,
            interaction.targetUser || interaction.targetMessage
        );
    } catch (err) {
        console.error(err);
        interactionError(
            interaction,
            "There was an error trying to run the button!"
        );
    }
};
