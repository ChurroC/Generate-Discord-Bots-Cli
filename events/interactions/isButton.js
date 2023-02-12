const toCamelCase = require("../../utils/toCamelCase.js");

exports.modules = async function isButton(interaction, client, db) {
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
            await command.button(interaction, client, db);
        } else {
            const buttonCommand =
                command.button[toCamelCase(interaction.customId)] ||
                command.button[interaction.customId];
            await buttonCommand(interaction, client, db);
        }
    } catch (err) {
        console.error(err);
        if (interaction.replied) {
            await interaction.followUp({
                content: "There was an error trying to run the button!",
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: "There was an error trying to run the button!",
                ephemeral: true,
            });
        }
    }
};
