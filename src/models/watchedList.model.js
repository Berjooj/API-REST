let mongoose = require('mongoose');

let WatchedListSchema = new mongoose.Schema({
    movieID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('WatchedList', WatchedListSchema);