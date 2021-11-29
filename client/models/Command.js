const mongoose = require('mongoose');


const CommandSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    dateC: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    container: {
        type: Boolean,
        required: true
    },
    comment: {
        type: String,
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('commands', CommandSchema);