let express = require("express");
let app = express();
let bodyParser = require('body-parser');
// let path = require('path');
// let {mongoose} = require("./database");
// let userRoute = require("./routes/user.route");
// let movieRoute = require("./routes/movie.route");

// let session = require("express-session");

//Middleware
// app.use(session({
//     secret: 'ahiu33uh2iSIUAH22', // session secret
//     resave: false,
//     saveUninitialized: true
//     }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(userRoute);
// app.use(movieRoute)
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/index',  express.static(__dirname + '/src'));
app.get('/', (request, res) => {
    res.send("Ola mundo");
});


// Start server
const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));