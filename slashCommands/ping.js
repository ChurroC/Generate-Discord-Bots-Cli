const { SlashCommandBuilder } = require('@discordjs/builders')

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction, client) {
        await interaction.reply('Pong!')
        const user = await client.database.members.findOne({ discordId: interaction.member.id });
        if (user) {
            user.pingCount = parseInt(user.pingCount) + 1;
            user.save();
        } else {
            await new client.database.members({ discordId: interaction.member.id, pingCount: 1}).save();
        }
    }
}