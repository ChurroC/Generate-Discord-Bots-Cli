const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle: { Primary, Secondary, Danger },
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("button")
        .setDescription("Replies with Pong!")
        .setDMPermission(true),
    async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("primary")
                .setLabel("I am a button!")
                .setStyle(Primary),
            new ButtonBuilder()
                .setCustomId("hi_button")
                .setLabel("I say hi!")
                .setStyle(Secondary)
        );
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("destruction")
                .setLabel("Destroy all buttons!")
                .setStyle(Danger)
        );
        interaction.reply({
            content: "Pong!",
            components: [row, row2],
        });
    },
    button: {
        async primary(interaction) {
            interaction.reply("Button clicked!");
        },
        // Also hi_button works
        async hiButton(interaction) {
            interaction.reply(`Hi ${interaction.user.username}!`);
        },
        async destruction(interaction) {
            interaction.update({ components: [] });
        },
    },
};
