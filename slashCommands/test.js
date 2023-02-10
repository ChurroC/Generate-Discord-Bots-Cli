const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle: { Primary, Secondary, Danger },
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
                .setStyle(Primary),
            new ButtonBuilder()
                .setCustomId("wow")
                .setLabel("Click me!")
                .setStyle(Secondary)
        );
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("three")
                .setLabel("Click me!")
                .setStyle(Danger)
        );
        interaction.reply({
            content: "Pong!",
            components: [row, row2],
        });
    },
    async primaryButton(interaction, client, db) {
        interaction.reply("Primary button clicked!");
    },
    async wowButton(interaction, client, db) {
        interaction.reply("Secondary button clicked!");
    },
    async threeButton(interaction, client, db) {
        interaction.reply("Danger button clicked!");
    },
};
