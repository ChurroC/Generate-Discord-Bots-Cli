const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("prefix")
        .setDescription("Changes the prefix of the bot for that guild.")
        .addStringOption(option =>
            option
                .setName("prefix")
                .setDescription("The new prefix for the guild.")
                .setRequired(true)
                .setMaxLength(4)
        )
        .setDMPermission(false),
    async execute(interaction, client, db) {
        const newPrefix = interaction.options.getString("prefix");

        if (newPrefix == interaction.guild.prefix)
            return interaction.reply({
                content: "You must specify a new prefix!",
                ephemeral: true,
            });
        if (newPrefix.length > 3)
            return interaction.reply({
                content: "The prefix must be less than 3 characters!",
                ephemeral: true,
            });

        await db.guild.update({
            where: {
                guildId: interaction.guildId,
            },
            data: {
                prefix: newPrefix,
            },
        });
        interaction.guild.prefix = newPrefix;
        await interaction.reply(`The prefix has been changed to ${newPrefix}`);
    },
};
