const { SlashCommandBuilder } = require('discord.js');

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDMPermission(true),
    async execute(interaction, client) {
        interaction.reply('Pong!');
        const user = await client.db.Template.findUnique({
            where: {
                memberId: interaction.member.id,
            },
        });
        console.log(user);
        if (user) {
            user.pingCount = parseInt(user.pingCount) + 1;
            user.save();
        } else {
            new client.database.members({
                discordId: interaction.member.id,
                pingCount: 1,
            }).save();
        }
    },
};
