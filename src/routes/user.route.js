let express = require("express");
let router  = express.Router();
let fileSystem = require('fs');
let userController = require('../controllers/user.controller');

// UserRoutes
router.post('/registerUser', userController.registerNewUser);
router.post('/login', userController.logIn);
router.get('/logout', userController.logOut);
router.get('/getUser', userController.getUser);

router.get('/catalog', (request, response) => {
    if (!request.session.userData) return response.status(401).redirect('/');
    else {
        fileSystem.readFile('./public/catalog.html', null, (err, htmlFile) => {
            if (err) {
                response.writeHead(404);
            }
            response.write(htmlFile);
            response.end();
        });
    }
});

router.get('/login', (request, response) => {
    fileSystem.readFile('./public/login.html', null, (err, htmlFile) => {
        if (err) {
            response.writeHead(404);
        }
        response.write(htmlFile);
        response.end();
    });
});

// Debug
router.get('/dashboard', (request, response) => {
    if (!request.session.userData) return response.status(401).send();
    else response.status(200).send("Logado!");
});

module.exports = router;