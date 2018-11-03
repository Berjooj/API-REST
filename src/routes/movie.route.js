let express = require("express");
let router  = express.Router();
let movieController = require('../controllers/movie.controller');

// Register a new movie
router.post('/registerMovie', movieController.createNewMovie);
// Get movie list
router.get('/movieList', movieController.getMovies);
// Get movie by id
router.get('/movie?id=', movieController.getMovie);
//
// router.put('/:id', movieController.editMovie);
// router.delete('/:id', movieController.deleteMovie);


router.get('/dashboard', (request, response) => {
    if (!request.session.userData) return response.status(401).send();
    
    else response.status(200).send("Logado!");
});

module.exports = router;