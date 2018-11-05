let EvaluationModel = require("../models/evaluation.model");
let evaluationController = {};

// Create vote
evaluationController.setEvaluationByUserId = async (request, response) => {
    let movieId = request.body.movieId;
    let userId  = request.body.userId;
    let evaluationValue = request.body.evaluation;
    let evaluationID = "";
    let updatedEvaluationMovie = [];

    let foundMovieToUpdate = await EvaluationModel.find();
    foundMovieToUpdate.forEach(movieEvaluated => {
        if (movieEvaluated['movieID'] === movieId && movieEvaluated['userID'] === userId) {
            updatedEvaluationMovie = movieEvaluated;
            evaluationID = movieEvaluated['_id'];
        }
    });
    
    if (isEmpty(updatedEvaluationMovie) === 0) {
        updatedEvaluationMovie = new EvaluationModel ({
            movieID: movieId,
            userID: userId,
            evaluation: evaluationValue
        });

        await updatedEvaluationMovie.save();
    } else {
        updatedEvaluationMovie['evaluation'] = evaluationValue;

        await EvaluationModel.findByIdAndUpdate(evaluationID, {$set: updatedEvaluationMovie}, {new: true});
    }
    return response.status(200).json({'Response': 'Status changed successfully.'});
};

//Get evaluation by userID
evaluationController.getEvaluationByUserId = async (request,response) => {
    let userID  = request.params.id;
    let evaluationDataList = await EvaluationModel.find();
    let userEvaluations = [];

    evaluationDataList.forEach(movieEvaluated => {
        if (movieEvaluated['userID'] === userID)
            userEvaluations[userEvaluations.length] = movieEvaluated;
    });

    return response.status(200).json(userEvaluations);
};

// Get list of votes
evaluationController.getEvaluations = async (request, response) => {
    let evaluationDataList = await EvaluationModel.find();
    response.status(200).json(evaluationDataList);
};

// Get vote by id
evaluationController.getEvaluationById = async (request, response) => {
    let evaluationData = await EvaluationModel.findById(request.params.id);
    response.status(200).json(evaluationData);
};

// Delete vote by id
evaluationController.deleteEvaluationById = async (request, response) => {
    await Evaluation.findByIdAndRemove(request.params.id);
    response.status(200).json({'Response': 'Evaluation deleted successfully.'});
};

function isEmpty (obj) {
    return Object.keys(obj).length;
}

module.exports = evaluationController;