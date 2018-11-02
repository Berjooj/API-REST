var mongoCliente = require("mongodb").MongoClient;
mongoCliente.connect("mongodb://admin2:YDEs274Yb3cfELJ@ds235807.mlab.com:35807/heroku_tbhttlkq",
    function (err, conn) {
        if (err) return console.log(err);
        var db = client.db('heroku_tbhttlkq"');

        db.collection('user').findOne({}, function (findErr, result) {
          if (findErr) throw findErr;
          console.log(result.name);
          client.close();
        });
    });


    function insertNewUser (firstName, lastName, callbakc) {
        global.db.collection("user").insert({firstName, lastName}, 
            function (err, result) {
                if (err) return console.log(err);
                callbakc();
            });
    }


    module.exports = {insertNewUser};