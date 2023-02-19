const {
    ContextMenuCommandBuilder,
    ApplicationCommandType: { User, Message },
} = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("User Information")
        .setType(User),
    // If user interaction function is execute(interaction, client, db, user)
    async execute(interaction, client, db, user) {
        await interaction.reply(
            `User information for ${user.username}#${user.discriminator} (${user.id})`
        );
    },
};
