const express = require('express');
const router = express.Router();

const parseRequest = require('../models/secondary/parse-request');
const show = require('../models/secondary/show');

router.post('/', async(req, res) => {
    let responseCode = await parseRequest.create(req.body);
    if (responseCode == 200)
        res.status(200).send('CREATE query completed successfully!');
    else
        res.status(404).send('Error occured...');
});

router.get('/clubs', async(req, res) => {
    let clubs = await show.clubs();
    res.send(clubs);
});

router.get('/players', async(req, res) => {
    let players = await show.players();
    res.send(players);
});

router.get('/doctors', async(req, res) => {
    let doctors = await show.doctors();
    res.send(doctors);
});

router.put('/', async(req, res) => {
    let responseCode = await parseRequest.update(req.body);
    if (responseCode == 200)
        res.status(200).send('UPDATE query completed successfully!');
    else
        res.status(404).send('Error occured...');
});

router.delete('/', async(req, res) => {
    let responseCode = await parseRequest.delete(req.body);
    if (responseCode == 200)
        res.status(200).send('DELETE query completed successfully!');
    else
        res.status(404).send('Error occured...');
});

module.exports = router;

// STILL NEED TO HANDLE EXCEPTIONS
