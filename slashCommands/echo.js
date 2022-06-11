const { SlashCommandBuilder } = require('@discordjs/builders')

//Example of using args
module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echoes the message arguments back to the user.'),
    async execute(interaction) {
        for (let i of args) {
            interaction.reply(i);
        }
    }
}