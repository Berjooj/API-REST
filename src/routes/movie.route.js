let express = require("express");
let router  = express.Router();
let movieController = require('../controllers/movie.controller');

// Register a new movie
router.post('/registerMovie', movieController.createNewMovie);
// Get movie list
router.get('/movieList', movieController.getMovies);
// Get movie by id
router.get('/movie/:id', movieController.getMovie);
// Delete movie by id
router.delete('/movie/delete/:id', movieController.deleteMovie);
// Edite movie by id
router.put('/movie/edit/:id', movieController.editMovie);

module.exports = router;