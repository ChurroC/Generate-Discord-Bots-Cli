module.exports = {
    name: 'prefix',
    description: 'Changes the prefix of the bot for that guild.',
    async execute(message, args, client) {
        const newPrefix = args[0];

        if (!newPrefix || newPrefix == message.guild.prefix) return message.reply('You must specify a new prefix!');
        if (newPrefix.length > 3) return message.reply('The prefix must be less than 3 characters!');
        
        const guild = await client.database.guilds.findOneAndUpdate({ guildId: message.guildId }, { prefix: newPrefix })
        guild.save();
        message.guild.prefix = newPrefix;

        message.reply(`The prefix has been changed to ${newPrefix}`);
    }
}