let UserRequire = require("../models/user.model");
let crypto = require('crypto');
let express = require("express");
let router  = express.Router();

// Register a new user
router.post('/registerUser', (request, response, body) => {
    let user = new UserRequire({
        name: request.body.name,
        email: request.body.email,
        password: crypto.createHash('md5').update(request.body.password).digest("hex")
    });

    user.save((error, data) => {
        if(data) response.status(201).send(data);
        else response.status(500).json(error);
    });
});

// Login user
router.post('/login', (request, response) => {
    let userEmail = request.body.email;
    let password  = crypto.createHash('md5').update(request.body.password).digest("hex");

    UserRequire.findOne({email: userEmail, password: password}, (err, user) => {
        if (err) return response.status(500).send();
        if (!user) return response.status(404).send();
        
        request.session.user = user;

        return response.status(200).send();
    });
});

// Logout
router.get('/logout', (request, response) => {
    request.session.destroy();
    return response.status(200).send();
});

router.get('/dashboard', (request, response) => {
    if (!request.session.user) return response.status(401).send();
    
    else response.status(200).send("Logado!");
});

module.exports = router;