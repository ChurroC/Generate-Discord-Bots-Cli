const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    discordId: {
        type: Number,
        required: true,
        unique: true
    },
    pingCount: {
        type: Number
    }
})

module.exports = {
    cmdName: 'members',
    model: mongoose.model('Members', schema)
}