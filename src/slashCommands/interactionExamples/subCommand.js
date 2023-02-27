const { SlashCommandBuilder } = require("discord.js");

/*
.addSubcommand(subcommand =>
            subcommand
                .setName("user")
                .setDescription("Info about a user")
                .addUserOption(option =>
                    option.setName("target").setDescription("The user")
                )
        )*/
module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Get info about a user or a server!")
        .addSubcommandGroup(subcommandGroup =>
            subcommandGroup
                .setName("user")
                .setDescription("Info about the user")
                .addSubcommand(subcommand =>
                    subcommand.setName("id").setDescription("Id of the user")
                )
        )
        .addSubcommandGroup(subcommandGroup =>
            subcommandGroup
                .setName("server")
                .setDescription("Info about the server")
                .addSubcommand(subcommand =>
                    subcommand.setName("id").setDescription("Id of the server")
                )
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
        async id(interaction) {
            await interaction.reply(
                `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
            );
        },
    },
};
