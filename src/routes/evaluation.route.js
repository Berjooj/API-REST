let express = require("express");
let router  = express.Router();
let evaluationController = require('../controllers/evaluation.controller');

// Register a vote
router.post('/registerEvaluation', evaluationController.createVoteForMovie);
// Get vote list
router.get('/evaluationList', evaluationController.getEvaluations);
// Get vote by id
router.get('/evaluation/:id', evaluationController.getEvaluationById);
// Delete vote by id
router.delete('/evaluation/delete/:id', evaluationController.deleteEvaluationById);
// Edite vote by id
router.put('/evaluation/edit/:id', evaluationController.editEvaluationById);

module.exports = router;