const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle: { Primary, Secondary, Danger },
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Get info about a user or a server!")
        .addSubcommand(subcommand =>
            subcommand
                .setName("user")
                .setDescription("Info about a user")
                .addUserOption(option =>
                    option.setName("target").setDescription("The user")
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("server_id")
                .setDescription("Info about the server")
        ),
    // If you want to change default behavior of button works you can just do async execute(interaction, client, db)
    execute: {
        // The function names are based of the subcommand names
        async user(interaction) {
            const user = interaction.options.getUser("target");
            if (user) {
                await interaction.reply(
                    `Username: ${user.username}\nID: ${user.id}`
                );
            } else {
                await interaction.reply(
                    `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`
                );
            }
        },
        // Use server_id or serverId
        async serverId(interaction) {
            await interaction.reply(
                `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
            );
        },
    },
    button: {
        async primary(interaction) {
            await interaction.reply("Button clicked!");
        },
        // Also hi_button works
        async hiButton(interaction) {
            await interaction.reply(`Hi ${interaction.user.username}!`);
        },
        async destructionButton(interaction) {
            await interaction.update({ components: [] });
        },
    },
};
