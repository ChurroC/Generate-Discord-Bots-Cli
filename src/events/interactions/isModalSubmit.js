const toCamelCase = require("../../utils/toCamelCase.js");

module.exports = async function isModalSubmit(interaction, client, db) {
    const [modelName, name] = interaction.customId.split(",");
    const command = client.slashCommands.get(
        process.env.ENV !== "production" ? name.slice(0, -4) : name
    );

    if (!command) {
        console.error(`No command matching ${name} was found.`);
        return;
    }

    try {
        if (typeof command.modal === "function") {
            await command.modal(interaction, client, db);
        } else {
            // Set button command to command.button[toCamelCase(interaction.customId, seperator)] || command.button[interaction.customId];
            // Do this only if your button id is name1_name2 and you want your function named name1_name2() and name1Name2()
            // Also set your seperator to whatever seperates each name1 and names2 in this example it would be "_"
            const modalCommand = command.modal[toCamelCase(modelName)];
            await modalCommand(interaction, client, db);
        }
    } catch (err) {
        console.error(err);
        interactionError(
            interaction,
            "There was an error trying to execute that modal!"
        );
    }
};
