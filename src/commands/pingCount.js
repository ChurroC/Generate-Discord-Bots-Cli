module.exports = {
    name: 'pingcount',
    description: 'Shows how many times you have played ping pong with the bot.',
    async execute(message, args, client, db) {
        const { pingCount } = await db.member.findUnique({
            where: {
                memberId: message.member.id,
            },
        });
        message.reply(`I have ponged your ping ${pingCount} times.`);
    },
};
