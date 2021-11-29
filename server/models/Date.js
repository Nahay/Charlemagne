const mongoose = require('mongoose');

const DateSchema = mongoose.Schema({
    dateC: {
        type: Date,
        required: true
    },
    visibility: {
        type: Boolean,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('calendar', DateSchema);