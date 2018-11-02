let CostumerModel = require('../models/costumer.model');
let express = require('express');
let router  = express.Router();

// Create a new costumer
// POST localhost:3000/costumer
router.post('/costumer', (request, response) => {
    // Something missing?
    if (!request.body) return response.status(400).send('Request body is missing.');
    
    let model = new CostumerModel(request.body);
    
    model.save()
        .then(doc => {
            
            if (!doc || doc.length == 0) return response.status(500).send(doc);
            
            response.status(201);
        })
});