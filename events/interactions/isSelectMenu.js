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
            await command.selectMenu(
                interaction,
                client,
                db,
                interaction.customId
            );
        } else {
            // Set select menu command to command.selectMenu[toCamelCase(interaction.customId, seperator)] || command.button[interaction.customId];
            // Do this only if your button id is name1_name2 and you want your function named name1_name2() and name1Name2()
            // Also set your seperator to whatever seperates each name1 and names2 in this example it would be "_"
            // Also do this for selectMenuValueCommand inside else statement
            const selectMenuCommand =
                command.selectMenu[toCamelCase(interaction.customId)];
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
                        selectMenuCommand[toCamelCase(value)];
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
        interactionError(
            interaction,
            "There was an error trying to run the select menu!"
        );
    }
};
