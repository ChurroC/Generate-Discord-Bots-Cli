const { SlashCommandBuilder } = require('discord.js');

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option =>
            option
                .setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)
                .setMaxLength(2000)
        )
        .addChannelOption(option =>
            option.setName('channel').setDescription('The channel to echo into')
        )
        .addBooleanOption(option =>
            option
                .setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')
        ),
    async execute(interaction, client, db) {
        const input = interaction.options.getString('input');
        const channel = interaction.options.getChannel('channel');
        const ephemeral = interaction.options.getBoolean('ephemeral');
        if (channel) {
            channel.send(input);
            interaction.reply({
                content: `"${input}" has been echoed in <#${channel.id}>`,
                ephemeral: true,
            });
        } else {
            interaction.reply({ content: input, ephemeral });
        }
    },
};
