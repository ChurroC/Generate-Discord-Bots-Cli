//Example of using args
module.exports = {
    name: 'echo',
    description: 'Echoes the message arguments back to the user.',
    async execute(message, args) {
        for (let i of args) {
            message.reply(i)
        }
    },
}
