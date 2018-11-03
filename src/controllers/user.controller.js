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
        if(userSuccessfullyRegistredData) {
            request.session.userData = userSuccessfullyRegistredData;
            response.status(201).redirect('/catalog');
        }
        else response.status(400).redirect('/?error=400');
    });
};

userController.logIn = async (request, response) => {
    let userEmail = request.body.email;
    let password  = crypto.createHash('md5').update(request.body.password).digest("hex");

    let user = {
        "email": userEmail, 
        "password": password
    };

    await UserModel.findOne(user, (err, userData) => {
        if (err) return response.status(500).redirect('/login?error=500');
        if (!userData) return response.status(404).redirect('/login?error=404');
        
        request.session.userData = userData;

        return response.status(200).redirect('/catalog');
    });
};

userController.getUser = async (request, response) => {
    response.status(201).json(request.session.userData);
}

userController.logOut = async (request, response) => {
    request.session.destroy();
    return response.status(200).redirect('/login');
}

module.exports = userController;