//Example of using database and replies
module.exports = {
    name: ["ping", "p"],
    description: "Replies with Pong!",
    async execute(message, args, client, db) {
        const test = message.reply(
            `Pong!\nLatency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(
                client.ws.ping
            )}ms`
        );
        try {
            test.reply("bhj");
        } catch (err) {
            message.reply("error from command itself that it specific to this comamnd");
        }
        db.member.update({
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
