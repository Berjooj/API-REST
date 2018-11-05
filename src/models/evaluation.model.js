let mongoose = require('mongoose');

let evaluationSchema = new mongoose.Schema({
    movieID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    evaluation: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);