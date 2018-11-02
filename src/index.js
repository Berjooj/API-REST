let express = require("express");
let app = express();
let personRoute = require("./routes/person");
let customerRoute = require('./routes/customer');
let path = require('path');
let bodyParser = require('body-parser');

app.use(bodyParser.json());

// Middleware
app.use((request, response, next) => {
    console.log(`${new Date().toString()} => ${request.originalUrl}`, request.body);
    next();
});

app.use(personRoute);
app.use(customerRoute);
app.use(express.static("public"));

// Handler for errors (404 - item not found)
app.use((request, response, next) => {
    response.status(404).send("Oooops... Página inexistente 404");
});

// Handler for errors (500 - internal server error)
app.use((err, request, response, next) => {
    console.error(err.stack);

    response.sendFile(path.join(__dirname, '../public/500.html'));
});

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));