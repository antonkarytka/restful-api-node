const express = require('express');
const router = express.Router();

const parseRequest = require('../models/secondary/parse-request');
const read = require('../models/crud/read');
const show = require('../models/secondary/show');

router.post('/', async(req, res) => {
    let responseCode = await parseRequest.create(req.body);
    if (responseCode == 200)
        res.status(200).send('CREATE query completed successfully!');
    else
        res.status(404).send('Error occured...');
});

router.get('/clubs', async(req, res) => {
    res.send(await show.clubs());
});

router.get('/clubs/:id', async(req, res) => {
    let url = req.originalUrl;
    let clubId = url.split('/').pop();
    res.send(await read.club(clubId));
});

router.get('/players', async(req, res) => {
    res.send(await show.players());
});

router.get('/players/:id', async(req, res) => {
    let url = req.originalUrl;
    let playerId = url.split('/').pop();
    res.send(await read.player(playerId));
});

router.get('/doctors', async(req, res) => {
    res.send(await show.doctors());
});

router.get('/doctors/:id', async(req, res) => {
    let url = req.originalUrl;
    let doctorId = url.split('/').pop();
    res.send(await read.doctor(doctorId));
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
