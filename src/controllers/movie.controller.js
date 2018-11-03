let MovieModel = require("../models/movie.model");
let movieController = {};

movieController.createNewMovie = async (request, response) => {
    let movie = new MovieModel({
        name: request.body.name,
        description: request.body.description,
        duration: parseInt(request.body.duration),
    });

    await movie.save((error, movieSuccessfullyRegistredData) => {
        if(movieSuccessfullyRegistredData) response.status(201).json(movieSuccessfullyRegistredData);
        else response.status(400).json({'Response': 'Error 400. Bad request.'});
    });
};

movieController.getMovies = async (request, response) => {
    let moviesDataList = await MovieModel.find();
    response.status(200).json(moviesDataList);
}

movieController.getMovie = async (request, response) => {
    console.log(request.params.id);
    let movieData = await MovieModel.findById(request.params.id);
    response.status(200).json(movieData);
}
module.exports = movieController;