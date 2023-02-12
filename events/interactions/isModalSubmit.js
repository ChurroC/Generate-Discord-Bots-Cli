const toCamelCase = require("../../utils/toCamelCase.js");

module.exports = async function isModalSubmit(interaction, client, db) {
    console.log(interaction);
    console.log(interaction.customId);
    console.log(interaction.message);
    const command = client.slashCommands.get(
        process.env.ENV !== "production"
            ? interaction.message.interaction.commandName.slice(0, -4)
            : interaction.message.interaction.commandName
    );

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    try {
        await command.modal(interaction, client, db);
    } catch (err) {
        console.error(err);
        if (interaction.replied) {
            await interaction.followUp({
                content: "There was an error trying to execute that command!",
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: "There was an error trying to execute that command!",
                ephemeral: true,
            });
        }
    }
};
