const express = require('express');
const router = express.Router();

const read = require('../models/crud/read');
const show = require('../models/secondary/show');

router.get('/', async(req, res) => {
    res.send(await show.clubs());
});

router.get('/:id', async(req, res) => {
    let url = req.originalUrl;
    let clubId = url.split('/').pop();
    let readClub = await read.club(clubId);
    if (readClub != 404) {
        res.status(200).send(readClub);
    } else {
        res.status(404).send('Requested club was not found...');
    };
});

module.exports = router;
