const toCamelCase = require("../../utils/toCamelCase.js");

exports.module = async function isSelectMenu(interaction, client, db) {
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
        if (typeof command.selectMenu === "function") {
            await command.selectMenu(interaction, client, db);
        } else {
            const selectMenuCommand =
                command.selectMenu[toCamelCase(interaction.customId)] ||
                command.selectMenu[interaction.customId];
            // This is if they have an object with the select menu name as the key and they can add the customId handler for each one or they have it so only one menu can be selected at a time
            if (typeof selectMenuCommand === "function") {
                await selectMenuCommand(
                    interaction,
                    client,
                    db,
                    interaction.values
                );
            } else {
                for (const value of interaction.values) {
                    const selectMenuValueCommand =
                        selectMenuCommand[toCamelCase(value)] ||
                        selectMenuCommand[value];
                    await selectMenuValueCommand(
                        interaction,
                        client,
                        db,
                        interaction.replied
                    );
                }
            }
        }
    } catch (err) {
        console.error(err);
        if (interaction.replied) {
            await interaction.followUp({
                content: "There was an error trying to run the select menu!",
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: "There was an error trying to run the select menu!",
                ephemeral: true,
            });
        }
    }
};
