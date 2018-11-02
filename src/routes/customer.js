let CustomerModel = require('../models/customer.model');
let express = require('express');
let router  = express.Router();

// INSERT
router.post('/customer', (request, response) => {
    // Something missing?
    if (!request.body) return response.status(400).send('Request body is missing.');
    
    let model = new CustomerModel(request.body);
    model.save()
        .then(_document => {
            if (!_document || _document.length === 0) return response.status(500).send(_document);

            response.status(201).send(_document);
        })
        .catch(error => {
            response.status(500).json(error);
        });
});

// GET
router.get('/customer', (request, response) => {
    if (!request.query.email) {
        return response.status(400).send('Email is missing.');
    }

    CustomerModel.findOne({
        email: request.query.email
    })
        .then(_document => {
            response.json(_document);
        })
        .catch(error => {
            response.status(500).json(error);
        });
});

// UPDATE
router.put('/customer', (request, response) => {
    if (!request.query.email) {
        return response.status(400).send('Email is missing.');
    }

    CustomerModel.findOneAndUpdate({
        email: request.query.email
    }, request.body, {
        new: true
    })
        .then(_document => {
            response.json(_document);
        })
        .catch(error => {
            response.status(500).json(error);
        });
});

// DELETE
router.delete('/customer', (request, response) => {
    if (!request.query.email) {
        return response.status(400).send('Email is missing.');
    }

    CustomerModel.findOneAndRemove({
        email: request.query.email
    })
        .then(_document => {
            response.json(_document);
        })
        .catch(error => {
            response.status(500).json(error);
        });
});


module.exports = router;