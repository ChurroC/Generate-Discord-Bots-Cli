const {
    Events: { MessageCreate },
    userMention,
} = require("discord.js");

module.exports = {
    name: MessageCreate,
    async execute(message, client, db) {
        if (message.author.bot) return;

        // Add guild to db
        if (!message.guild.prefix) {
            // Load prefix into cache
            const guild = await db.guild.upsert({
                where: {
                    guildId: message.guild.id,
                },
                update: {},
                create: {
                    guildId: message.guild.id,
                },
            });
            message.guild.prefix = guild.prefix;
        }
        const prefix = message.guild.prefix;

        if (
            !message.content.startsWith(prefix) &&
            message.content.startsWith(userMention(client.user.id))
        )
            return;

        if (message.content === `<@${client.user.id}>`) {
            return message.reply(`The prefix is ${prefix}`);
        }

        // Add member to db
        if (client.users.cache.get(message.member.id)) {
            await db.member.upsert({
                where: {
                    memberId: message.member.id,
                },
                update: {},
                create: {
                    memberId: message.member.id,
                },
            });
        }

        let args;
        //First take out the prefix. Then take out blank spaces at the end. Then turn into an array that is split between blanck spaces.
        if (message.content.startsWith(prefix)) {
            args = message.content.slice(prefix.length).trim().split(/ +/);
        } else {
            args = message.content
                .slice(client.user.id.length + 3)
                .trim()
                .split(/ +/);
        }
        //Command is the first element in the array and the array loses the first index. Command also turn to lower case.
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            command.execute(message, args, client, db);
        } catch (err) {
            console.error(err);
            message.reply("there was an error trying to execute that command!");
        }
    },
};
