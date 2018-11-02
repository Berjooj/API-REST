let mongoose = require('mongoose');

let evaluationSchema = new mongoose.Schema({
    movieID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true,
        unique: true
    },
    evaluation: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);