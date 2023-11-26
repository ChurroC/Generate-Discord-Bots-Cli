const { SlashCommandBuilder } = require('discord.js');

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping_count')
        .setDescription('Shows how many times you have played ping pong with the bot.'),
    async execute(interaction, client, db) {
        const { pingCount } = await db.member.findUnique({
            where: {
                memberId: interaction.member.id,
            },
        });
        await interaction.reply(`I have ponged your ping ${pingCount} times.`);
    },
};
