const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle: { Short, Paragraph },
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("modal")
        .setDescription("Creates a button!")
        .setDMPermission(true),
    async execute(interaction) {
        // Create the text input components
        const favoriteColorInput = new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setCustomId("favoriteColorInput")
                // The label is the prompt the user sees for this input
                .setLabel("What's your favorite color?")
                .setPlaceholder("Favorite Color Here")
                .setRequired(true)
                // Short means only a single line of text
                .setStyle(Short)
        );

        const hobbiesInput = new ActionRowBuilder().addComponents(
            new TextInputBuilder()
                .setCustomId("hobbiesInput")
                .setLabel("What's some of your favorite hobbies?")
                .setPlaceholder("Favorite Hobby Here")
                // Paragraph means multiple lines of text.
                .setStyle(Paragraph)
        );

        // Modal id doesn't matter
        await interaction.showModal(
            new ModalBuilder()
                .setCustomId("modal")
                .setTitle("My Modal")
                .addComponents(favoriteColorInput, hobbiesInput)
        );
    },
    async modal(interaction, client, db) {
        console.log("hji");
        // Get the values from the modal
        const favoriteColor =
            interaction.fields.getTextInputValue("favoriteColorInput");
        const hobbies = interaction.fields.getTextInputValue("hobbiesInput");

        // Send a message to the user with the values they entered
        await interaction.reply(
            `Your favorite color is ${favoriteColor} and your favorite hobbies are ${hobbies}`
        );
    },
};
