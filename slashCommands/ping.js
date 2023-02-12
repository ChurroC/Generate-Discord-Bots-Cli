const { SlashCommandBuilder } = require("discord.js");

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!")
        .setDMPermission(true),
    async execute(interaction, client, db) {
        await interaction.reply(
            `Pong!\nLatency is ${
                Date.now() - interaction.createdTimestamp
            }ms. API Latency is ${Math.round(client.ws.ping)}ms`
        );
        await db.member.update({
            where: {
                memberId: interaction.member.id,
            },
            data: {
                pingCount: {
                    increment: 1,
                },
            },
        });
    },
};
