const { Schema, model } = require('mongoose');
const { hashSync, compareSync, genSaltSync } = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        default: "non défini"
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateHash = function(password) {
    return hashSync(password, genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return compareSync(password, this.password);
}


const CommandSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateC: {
        type: Number,
        required: true
    },
    timeC: {
        type: String,
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
    },
    list: [{ 
        type: Schema.Types.ObjectId,
        ref: 'CommandList'
    }]
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
    CommandList: model('CommandList', CommandListSchema),
    User: model('User', UserSchema)
};