const mongoose = require('mongoose');

const ParamSchema = mongoose.Schema({
    sentence: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('params', ParamSchema);