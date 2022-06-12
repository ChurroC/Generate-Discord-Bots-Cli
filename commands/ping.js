//Example of using database and replies
module.exports = {
    name: 'ping',
    discription: 'Replies with Pong!',
    async execute(message, args, client) {
        message.reply('Pong!');
        const user = await client.database.members.findOne({ discordId: message.author.id });
        if (user) {
            user.pingCount++;
            user.save();
        } else {
            await new client.database.members({ discordId: message.author.id, pingCount: 1}).save();
        }
    }
}