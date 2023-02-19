const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Replies with embed!")
        .addStringOption(option =>
            option.setName("embed_title").setDescription("Title of the embed")
        )
        .addAttachmentOption(option =>
            option
                .setName("embed_picture")
                .setDescription("Picture for the embed")
        ),
    async execute(interaction, client, db) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(
                interaction.options.getString("embed_title") || "Some title"
            )
            .setURL("https://discord.js.org/")
            .setAuthor({
                name: "Some name",
                iconURL: "https://i.imgur.com/AfFp7pu.png",
                url: "https://discord.js.org",
            })
            .setDescription("Some description here")
            .setThumbnail("https://i.imgur.com/AfFp7pu.png")
            .addFields(
                { name: "Regular field title", value: "Some value here" },
                { name: "\u200B", value: "\u200B" },
                {
                    name: "Inline field title",
                    value: "Some value here",
                    inline: true,
                },
                {
                    name: "Inline field title",
                    value: "Some value here",
                    inline: true,
                }
            )
            .addFields({
                name: "Inline field title",
                value: "Some value here",
                inline: true,
            })
            .setImage(
                interaction.options.getAttachment("embed_picture")
                    ?.attachment || "https://i.imgur.com/AfFp7pu.png"
            )
            .setTimestamp()
            .setFooter({
                text: "Some footer text here",
                iconURL: "https://i.imgur.com/AfFp7pu.png",
            });
        await interaction.reply({ embeds: [exampleEmbed] });
    },
};
