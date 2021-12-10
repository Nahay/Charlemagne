const { Schema, model } = require('mongoose');


const ParamSchema = Schema({
    sentence: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = model('Param', ParamSchema);