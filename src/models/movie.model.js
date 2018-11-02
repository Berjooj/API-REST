let mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Movie', MovieSchema);