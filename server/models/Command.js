const { Schema, model } = require('mongoose');


const CommandSchema = new Schema({
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


const CommandListSchema = new Schema({
    command: {
        type: Schema.Types.ObjectId,
        ref: 'Command',
        required: true
    },
    dishID: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});


module.exports = {
    Command: model('Command', CommandSchema),
    CommandList: model('CommandList', CommandListSchema)
};