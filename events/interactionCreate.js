module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command =  client.slashCommands.get(interaction.commandName);
        if (!command) return;
    
        try {
            await command.execute(interaction, client);
        } catch (err) {
            console.error(err);
            await interaction.reply({
                content: 'There was an error trying to execute that command!',
                ephemeral: true
            });
        }
    }
};