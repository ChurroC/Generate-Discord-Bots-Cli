const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction, db) {
        await interaction.reply('Pong!')
        const user = await db.findOne({ discordId: message.author.id });
        if (user) {
            user.pingCount++;
            await user.save();
        } else {
            await new db({ discordId: message.author.id, pingCount: 1}).save();
        }
    }
}