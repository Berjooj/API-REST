let EvaluationModel = require("../models/evaluation.model");
let evaluationController = {};

// Create vote
evaluationController.createVoteForMovie = async (request, response) => {
    let evaluation = new EvaluationModel({
        movieID: request.body.movieID,
        userID: request.body.userID,
        evaluation: request.body.movieEvaluation
    });

    await evaluation.save((error, evaluationSuccessfullyRegistredData) => {
        if(evaluationSuccessfullyRegistredData) {
            request.session.userData = evaluationSuccessfullyRegistredData;
            response.status(201).json({'Response': 'Vote registred successfully.'});
        }
        else response.status(500).json({'Response': 'Error 500, something went wrong.'});
    });
};

// Edit vote by id
evaluationController.editEvaluationById = async (request, response) => {
    let id =  request.params.id;

    let evaluation = {
        name: request.body.name,
        movie: request.body.movie,
        evaluation: request.body.evaluation
    };

    let evaluationData = await Evaluation.findByIdAndUpdate(id, {$set: evaluation}, {new: true});
    response.status(200).json({'Response': 'Evaluation changed successfully.'});
}

// Get list of votes
evaluationController.getEvaluations = async (request, response) => {
    let evaluationDataList = await EvaluationModel.find();
    response.status(200).json(evaluationDataList);
}

// Get vote by id
evaluationController.getEvaluationById = async (request, response) => {
    let evaluationData = await EvaluationModel.findById(request.params.id);
    response.status(200).json(evaluationData);
}

// Delete vote by id
evaluationController.deleteEvaluationById = async (request, response) => {
    await Evaluation.findByIdAndRemove(request.params.id);
    response.status(200).json({'Response': 'Evaluation deleted successfully.'});
}

module.exports = evaluationController;