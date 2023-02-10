const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle: { Primary },
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Replies with Pong!")
        .setDMPermission(true),
    async execute(interaction, client, db) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("primary")
                .setLabel("Click me!")
                .setStyle(Primary)
        );
        interaction.reply({
            content: "Pong!",
            components: [row],
        });
    },
    async primaryButton(interaction, client, db) {
        interaction.reply("Primary button clicked!");
    },
};
