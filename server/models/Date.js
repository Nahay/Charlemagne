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
    comment: {
        type: String,
        required: false
    }
});

module.exports = model('Date', DateSchema);