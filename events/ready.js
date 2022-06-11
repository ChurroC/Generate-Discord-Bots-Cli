const { ClientUser } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence('In Template Building', { type: 'COMPETING' });
        client.user.setStatus('online');
    }
}