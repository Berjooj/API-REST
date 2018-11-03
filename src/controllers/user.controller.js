let UserModel = require("../models/user.model");
let crypto = require('crypto');
let userController = {};

userController.registerNewUser = async (request, response) => {
    let user = new UserModel({
        name: request.body.name,
        email: request.body.email,
        password: crypto.createHash('md5').update(request.body.password).digest("hex")
    });

    await user.save((error, userSuccessfullyRegistredData) => {
        if(userSuccessfullyRegistredData) response.status(201).json(userSuccessfullyRegistredData);
        else response.status(400).json({'Response': 'Error 400. Bad request.'});
    });
};

userController.logIn = async (request, response) => {
    let userEmail = request.body.email;
    let password  = crypto.createHash('md5').update(request.body.password).digest("hex");

    await UserModel.findOne({email: userEmail, password: password}, (err, userData) => {
        if (err) return response.status(500).json(err);
        if (!userData) return response.status(404).json({'Response': "Nothing has found"});
        
        request.session.userData = userData;

        return response.status(200).json({'Response': "Successfully logged in!"});
    });
};

userController.logOut = async (request, response) => {
    request.session.destroy();
    return response.status(200).send();
}

module.exports = userController;