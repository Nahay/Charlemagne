const mongoose = require('mongoose');

const DateSchema = mongoose.Schema({
    dateC: {
        type: Number,
        required: true
    },
    visibility: {
        type: Boolean,
        required: true
    },
    comment: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('calendar', DateSchema);