let WatchListStatusModel = require("../models/watchedList.model");
let watchListStatusController = {};

// Update status
// if already exists -> update
// else -> create one
watchListStatusController.setWatchedStatusById = async (request, response) => {
    let movieId = request.body.movieId;
    let userId  = request.body.userId;
    let isWatched = request.body.status;
    
    let updatedWatchStatus = [];

    // Check if the movie already is on the list
    let foundMovieToUpdate = await WatchListStatusModel.find();
    foundMovieToUpdate.forEach(watchStatus => {
        if (watchStatus['movieID'] === movieId && watchStatus['userID'] === userId) {
            updatedWatchStatus = watchStatus;
        }
    });
    
    // if nothing found
    if (isEmpty(updatedWatchStatus) === 0) {
        updatedWatchStatus = new WatchListStatusModel ({
            movieID: movieId,
            userID: userId
        });
        // if needs to set watched
        if (isWatched === true)
            await updatedWatchStatus.save();

        // else (no need to remove from list if it doesn't exists)

    } else { // So... If I have found a movie status
        // if needs to set unwatched
        if (isWatched === false)
            await WatchListStatusModel.findByIdAndRemove(updatedWatchStatus['_id']);
        // else (no need to insert if it already exists)
    }
    return response.status(200).json({'Response': 'Status changed successfully.'});
};

// Get list of watched movies
watchListStatusController.getWatchedList = async (request, response) => {
    
}

function isEmpty (obj) {
    return Object.keys(obj).length;
}

module.exports = watchListStatusController;