let MovieModel = require("../models/movie.model");
let express = require("express");
let router  = express.Router();

// Register a new user
router.post('/registerMovie', (request, response, body) => {
    let movie = new MovieModel({
        name: request.body.name,
        description: request.body.description,
        duration: parseInt(request.body.duration),
    });

    movie.save((error, data) => {
        if(data) response.status(201).send(data);
        else response.status(500).json(error);
    });
});

// Login user
router.post('/login', (request, response) => {
    let userEmail = request.body.email;
    let password  = request.body.password;

    UserRequire.findOne({email: userEmail, password: password}, (err, user) => {
        if (err) return response.status(500).send();
        if (!user) return response.status(404).send();
        
        request.session.user = user;

        return response.status(200).send();
    });
});

router.get('/dashboard', (request, response) => {
    if (!request.session.user) return response.status(401).send();
    
    else response.status(200).send("Logado!");
});

module.exports = router;