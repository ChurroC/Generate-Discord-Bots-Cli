module.exports = {
    name: 'pingcount',
    discription: 'Shows how many times you have played ping pong with the bot.',
    async execute(message, args, client) {
        const times = await client.database.members.findOne({ id: message.author.id });
        message.reply(`I have ponged your ping ${times.pingCount} times.`);
    }
}