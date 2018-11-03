let express = require("express");
let router  = express.Router();
let watchedListController = require('../controllers/watchedList.controller');

// watched list Routes
router.post('/setWatched', watchedListController.setWatchedStatusById);
router.get('/getWatchedList', watchedListController.getWatchedList);

module.exports = router;