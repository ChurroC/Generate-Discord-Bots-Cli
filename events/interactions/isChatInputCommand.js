const toCamelCase = require("../../utils/toCamelCase.js");

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
            const chatCommand =
                command.execute[
                    toCamelCase(interaction.options.getSubcommand())
                ] || command.execute[interaction.commandName];
            await chatCommand(interaction, client, db);
        }
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
