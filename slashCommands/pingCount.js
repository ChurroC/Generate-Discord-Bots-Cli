const { SlashCommandBuilder } = require('@discordjs/builders')

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping_count')
        .setDescription('Shows how many times you have played ping pong with the bot.'),
    async execute(interaction, client) {
        const times = await client.database.members.findOne({ id: interaction.member.id });
        await interaction.reply(`I have ponged your ping ${times.pingCount} times.`)
    }
}