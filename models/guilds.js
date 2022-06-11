const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildId: {
        type: Number,
        required: true,
        unique: true
    },
    prefix: {
        type: String
    }
})

module.exports = {
    cmdName: 'guilds',
    model: mongoose.model('Guilds', schema)
}