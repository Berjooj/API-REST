let mongoose = require('mongoose');

const server = "ds235807.mlab.com:35807";
const database = "heroku_tbhttlkq";
const user = "admin2";
const password = "YDEs274Yb3cfELJ";

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);

let CostumerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Costumer', CostumerSchema);