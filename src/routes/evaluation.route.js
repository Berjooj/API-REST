let express = require("express");
let router  = express.Router();
let evaluationController = require('../controllers/evaluation.controller');

// Update/register a vote
router.post('/setEvaluation', evaluationController.setEvaluationByUserId);
// Get vote by id
router.get('/evaluation/', evaluationController.getEvaluations);
// Get vote by user id
router.get('/evaluation/:id', evaluationController.getEvaluationByUserId);
// Delete vote by id
router.delete('/evaluation/delete/:id', evaluationController.deleteEvaluationById);

module.exports = router;