const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping_count')
        .setDescription('Replies with Pong!'),
    async execute(interaction, db) {
        const times = await db.findOne({ discordId: interaction.member.id });
        await interaction.reply(`I have ponged your ping ${times.pingCount} times.`)
    }
}