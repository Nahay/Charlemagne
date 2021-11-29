const mongoose = require('mongoose');


const CommandListSchema = mongoose.Schema({
    commandID: {
        type: String,
        required: true
    },
    dishID: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('commandsList', CommandListSchema);