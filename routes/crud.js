const express = require('express');
const router = express.Router();

const parseRequest = require('../models/secondary/parse-request');

router.post('/', (req, res) => {
    let responseCode = parseRequest.create(req.body);
    if (responseCode == 200)
        res.status(200).send('CREATE query completed successfully!');
    else
        res.status(404).send('Error occured...');
});

router.put('/', (req, res) => {
    let responseCode = parseRequest.update(req.body);
    if (responseCode == 200)
        res.status(200).send('UPDATE query completed successfully!');
    else
        res.status(404).send('Error occured...');
});

router.delete('/', (req, res) => {
    let responseCode = parseRequest.delete(req.body);
    if (responseCode == 200)
        res.status(200).send('DELETE query completed successfully!');
    else
        res.status(404).send('Error occured...');
});

module.exports = router;

// STILL NEED TO HANDLE EXCEPTIONS
