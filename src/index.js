let express = require("express");
let app = express();
let bodyParser = require('body-parser');

let {mongoose} = require("./database");
let registerRoute = require("./routes/register");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(registerRoute, (err, request) => {});

// Start server
const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));