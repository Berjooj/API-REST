let mongoose = require('mongoose');

const server = "ds235807.mlab.com:35807";
const database = "heroku_tbhttlkq";
const user = "admin2";
const password = "YDEs274Yb3cfELJ";

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, 
    function (err, response) {
        if (err) console.log(err);
        else console.log("Successfully connected do database.");
    });