module.exports = {
    name: 'messageCreate',
    execute(message, client, db) {
        if (!(message.content.startsWith(client.prefix) || message.content.slice(0, client.user.id.length+3) === `<@${client.user.id}>`) || message.author.bot) return;

        let args
        //First take out the prefix. Then take out blank spaces at the end. Then turn into an array that is split between blanck spaces.
        if (message.content.startsWith(message.client.prefix)) { args = message.content.slice(message.client.prefix.length).trim().split(/ +/); }
        else { args = message.content.slice(message.client.user.id.length+3).trim().split(/ +/); };
        //Command is the first element in the array and the array loses the first index. Command also turn to lower case.
        const command = args.shift().toLowerCase();

        const run = client.commands.get(command);
        if (!run) return;
    
        try {
            run.execute(message, args, db);
        } catch (err) {
            console.error(err);
            message.reply('there was an error trying to execute that command!');
        }
    }
};