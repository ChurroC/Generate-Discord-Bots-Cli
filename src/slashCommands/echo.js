const { SlashCommandBuilder, ChannelType } = require("discord.js");

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Replies with your input!")
        .addStringOption(option =>
            option
                .setName("input")
                .setDescription("The input to echo back")
                .setRequired(true)
                .setMaxLength(2000)
        )
        .addChannelOption(option =>
            option
                .setName("channel")
                .setDescription("The channel to echo into")
                .addChannelTypes(ChannelType.GuildText)
        )
        .addBooleanOption(option =>
            option
                .setName("ephemeral")
                .setDescription(
                    "Whether or not the echo should be ephemeral. Can only be emphermal if a channel is not specified."
                )
        ),
    async execute(interaction) {
        const input = interaction.options.getString("input");
        const channel = interaction.options.getChannel("channel");
        const ephemeral = interaction.options.getBoolean("ephemeral");
        try {
            if (channel) {
                channel.send(input);
                await interaction.reply({
                    content: `"${input}" has been echoed in <#${channel.id}>`,
                    ephemeral: true,
                });
            } else {
                await interaction.reply({ content: input, ephemeral });
            }
        } catch (err) {
            await interaction.reply({
                content: "The bot could not send the message.",
                ephemeral: true,
            });
        }
    },
};
