let express = require("express");
let router  = express.Router();

// QueryString -> query property on the request object
// localhost:3000/person?name=Thomas&age=20 (query/parâmetro)
router.get('/person', (request, response) => {
    if (request.query.name)
        response.send(`You have requested a person ${request.query.name}`);
    else
        response.send('You have requested a person');
});


// Parms property on the request object
// localhost:3000/person/thomas (diretório)
router.get('/person/:name', (request, response) => {
    response.send(`You have requested a person ${request.params.name}`);
});


router.get('/error', (request, response) => {
    throw new Error("Erro lindo e maravilhoso");
});

module.exports = router;