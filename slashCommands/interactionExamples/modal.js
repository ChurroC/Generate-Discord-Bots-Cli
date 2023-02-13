const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle: { Short, Paragraph },
    ButtonBuilder,
    ButtonStyle: { Primary, Secondary },
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

        // You must add a param of interaction to the ModalBuilder else your modal will not be recieved!
        await interaction.showModal(
            new ModalBuilder()
                .setCustomId("modal thing", interaction)
                .setTitle("My Modal")
                .addComponents(favoriteColorInput, hobbiesInput)
        );
    },
    modal: {
        async modalThing(interaction) {
            // Get the values from the modal
            const favoriteColor =
                interaction.fields.getTextInputValue("favoriteColorInput");
            const hobbies =
                interaction.fields.getTextInputValue("hobbiesInput");

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("primary")
                    .setLabel("I am a button!")
                    .setStyle(Primary),
                new ButtonBuilder()
                    .setCustomId("hi button")
                    .setLabel("I say hi!")
                    .setStyle(Secondary)
            );

            // Send a message to the user with the values they entered
            console.log("interaction");
            console.log("i");
            interaction.reply({
                content: `Your favorite color is ${favoriteColor} and your favorite hobbies are ${hobbies}`,
                components: [row],
            });
        },
    },
    button: {
        async primary(interaction) {
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

            console.log("test");
            const hobbiesInput = new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId("hobbiesInput")
                    .setLabel("What's some of your favorite hobbies?")
                    .setPlaceholder("Favorite Hobby Here")
                    // Paragraph means multiple lines of text.
                    .setStyle(Paragraph)
            );

            // Modal id must be interaction.commandName
            await interaction.showModal(
                new ModalBuilder()
                    .setCustomId("modal thing", interaction)
                    .setTitle("My Modal")
                    .addComponents(favoriteColorInput, hobbiesInput)
            );
        },
        async hiButton(interaction) {
            await interaction.reply(`Hi ${interaction.user.username}!`);
        },
    },
};
