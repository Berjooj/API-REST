let express = require("express");
let app = express();
let bodyParser = require('body-parser');

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

app.use(express.static("public"));
// app.use(userRoute);
// app.use(movieRoute);

// Start server
const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));