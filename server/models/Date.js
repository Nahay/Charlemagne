const { Schema, model } = require('mongoose');


const DateSchema = Schema({
    dateC: {
        type: Number,
        required: true,
        unique: true
    },
    visibility: {
        type: Boolean,
        required: true
    },
    timeMin: {
        type: String,
        required: true
    },
    timeMax: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    }
});

module.exports = model('Date', DateSchema);