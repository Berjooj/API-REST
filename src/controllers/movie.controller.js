let MovieModel = require("../models/movie.model");
let movieController = {};

// Create Movie
movieController.createNewMovie = async (request, response) => {
    let movie = new MovieModel({
        name: request.body.name,
        description: request.body.description,
        duration: parseInt(request.body.duration)
    });

    await movie.save((error, movieSuccessfullyRegistredData) => {
        if(movieSuccessfullyRegistredData) response.status(201).send();
        else response.status(400).json({'Response': 'Error 400. Bad request.'});
    });
};

// Edit movie by id
movieController.editMovieById = async (request, response) => {
    let id = request.params.id;
    let movieUpdated = {
        name: request.body.name,
        description: request.body.description,
        duration: parseInt(request.body.duration)
    };

    let movieData = await MovieModel.findByIdAndUpdate(id, {$set: movieUpdated}, {new: true});
    response.status(200).json({'Response': 'Movie changed successfully.'});
}

// Get list of movies
movieController.getMovies = async (request, response) => {
    let moviesDataList = await MovieModel.find();
    response.status(200).json(moviesDataList);
}

// Get movie by id
movieController.getMovieById = async (request, response) => {
    let movieData = await MovieModel.findById(request.params.id);
    response.status(200).json(movieData);
}

// Delete movie by id
movieController.deleteMovieById = async (request, response) => {
    let movieData = await MovieModel.findByIdAndRemove(request.params.id);
    response.status(200).json({'Response': 'Movie deleted successfully.'});
}

module.exports = movieController;