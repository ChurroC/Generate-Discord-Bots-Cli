const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle: { Primary, Secondary, Danger },
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("button")
        .setDescription("Creates a button!"),
    async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("primary")
                .setLabel("I am a button!")
                .setStyle(Primary),
            new ButtonBuilder()
                .setCustomId("Hi Button")
                .setLabel("I say hi!")
                .setStyle(Secondary)
        );
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("destruction button")
                .setLabel("Destroy all buttons!")
                .setStyle(Danger)
        );
        await interaction.reply({
            content: "Pong!",
            components: [row, row2],
        });
    },
    // If you want to change default behavior of button works you can just do button(interaction, client, db, customId)
    // If you have the id as name1 name2 you can either do name1 name2 or name1Name2 which is preferred
    button: {
        // Name must be the same as the customId
        async primary(interaction) {
            await interaction.reply("Button clicked!");
        },
        // You must turn the customId into camelCase
        async hiButton(interaction) {
            await interaction.reply(`Hi ${interaction.user.username}!`);
        },
        async destructionButton(interaction) {
            await interaction.update({ components: [] });
        },
    },
};
