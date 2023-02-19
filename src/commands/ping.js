//Example of using database and replies
module.exports = {
    name: ["ping", "p"],
    description: "Replies with Pong!",
    async execute(message, args, client, db) {
        message.reply(
            `Pong!\nLatency is ${
                Date.now() - message.createdTimestamp
            }ms. API Latency is ${Math.round(client.ws.ping)}ms`
        );
        await db.member.update({
            where: {
                memberId: message.member.id,
            },
            data: {
                pingCount: {
                    increment: 1,
                },
            },
        });
    },
};
