let UserRequire = require("../models/user.model");
let crypto = require('crypto');
let express = require("express");
let router  = express.Router();

// Register a new user
router.post('/register', (request, response, body) => {
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
    
});

module.exports = router;