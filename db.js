var mongoCliente = require("mongodb").MongoClient;
mongoCliente.connect("mongodb://admin2:YDEs274Yb3cfELJ@ds235807.mlab.com:35807/heroku_tbhttlkq",
    function (err, conn) {
        if (err) return console.log(err);
        else console.log("connected");
        global.db = conn;
    });


    // function insertNewUser (firstName, lastName, callbakc) {
    //     global.db.collection("user").insert({firstName, lastName}, 
    //         function (err, result) {
    //             if (err) return console.log(err);
    //             callbakc();
    //         });
    // }


    // module.exports = {insertNewUser};
    module.exports = {};