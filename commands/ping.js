module.exports = {
    name: 'ping',
    discription: 'Replies with Pong!',
    async execute(message, args, db) {
        message.reply('Pong!');
        const user = await db.findOne({ discordId: message.author.id });
        if (user) {
            user.pingCount++;
            await user.save();
        } else {
            await new db({ discordId: message.author.id, pingCount: 1}).save();
        }
        //eval(args[0]);
        //console.log(args[0]);
        //(()=>{message.channel.send("fgyuigyug" + "<@774373664149078056>")})();
    }
}