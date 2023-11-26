const { ContextMenuCommandBuilder, ApplicationCommandType, quote } = require("discord.js");

// Have an array to also amke it a slahs command
module.exports = {
    data: new ContextMenuCommandBuilder().setName("quote").setType(ApplicationCommandType.Message),
    // Message ineraction or user interaction depending
    // If message interaction function is execute(interaction, client, db, message)
    async execute(interaction, client, db, message) {
        interaction.reply(`${quote(message.content)} from ${message.author}`);
    },
};
