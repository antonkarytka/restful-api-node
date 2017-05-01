const express = require('express');
const router = express.Router();

const parseRequest = require('../models/secondary/parse-request');

router.post('/', async(req, res) => {
    let responseCode = await parseRequest.create(req.body);
    if (responseCode == 200) {
        res.status(200).send('CREATE query completed successfully!');
    } else {
        res.status(404).send('Error in query...');
    };
});

router.get('/', (req, res) => {
    res.status(409).send('Requested page is unavailable. Please, try "/clubs", "/players", "/doctors".')
});

router.put('/', async(req, res) => {
    let responseCode = await parseRequest.update(req.body);
    if (responseCode == 200) {
        res.status(200).send('UPDATE query completed successfully!');
    } else {
        res.status(404).send('Requested entity was not found...');
    };
});

router.delete('/', async(req, res) => {
    let responseCode = await parseRequest.delete(req.body);
    if (responseCode == 200) {
        res.status(200).send('DELETE query completed successfully!');
    } else {
        res.status(404).send('Requested entity was not found...');
    };
});

module.exports = router;
