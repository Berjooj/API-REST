let express = require("express");
let router  = express.Router();

let userController = require('../controllers/user.controller');

// UserRoutes
router.post('/registerUser', userController.registerNewUser);
router.post('/login', userController.logIn);
router.get('/logout', userController.logOut);

// Debug
router.get('/dashboard', (request, response) => {
    if (!request.session.userData) return response.status(401).send();
    else response.status(200).send("Logado!");
});

module.exports = router;