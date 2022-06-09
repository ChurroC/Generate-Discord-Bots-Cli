module.exports = {
    name: 'pingcount',
    discription: 'Shows how many times you have dont ping pong with the bot.',
    async execute(message, args, db) {
        const times = await db.findOne({ discordId: message.author.id });
        message.reply(`I have ponged your ping ${times.pingCount} times.`);
    }
}