let mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);