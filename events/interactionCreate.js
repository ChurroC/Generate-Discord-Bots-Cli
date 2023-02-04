const {
    Events: { InteractionCreate },
} = require('discord.js');

module.exports = {
    name: InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(
                process.env.ENV !== 'production'
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
                await command.execute(interaction, client);
            } catch (err) {
                console.error(err);
                interaction.reply({
                    content:
                        'There was an error trying to execute that command!',
                    ephemeral: true,
                });
            }
        } else if (interaction.isButton()) {
        } else if (interaction.isSelectMenu()) {
        } else if (interaction.isAutocomplete()) {
        } else if (interaction.isModalSubmit()) {
        } else if (interaction.isModalClose()) {
        }
    },
};
