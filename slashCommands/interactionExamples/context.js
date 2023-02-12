const {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
} = require("discord.js");

// Have an array to also amke it a slahs command
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Say Hi")
        .setType(ApplicationCommandType.User),
    // Message ineraction or user interaction depending]
    async execute(interaction) {
        console.log(interaction.targetUser.username);
        console.log(interaction.options.getUser("target"));
        await interaction.reply(`Hi ${interaction.options.getUser("target")}`);
    },
};
