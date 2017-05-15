const express = require('express');
const router = express.Router();

const read = require('../models/read');
const response = require('../models/secondary/response');

router.get('/:id', async(req, res) => {
    let url = req.originalUrl;
    let clubId = url.split('/').pop();
    let readClub = await read.club(clubId);
    if (readClub != 404) {
        res.status(200).send(response.form(req, readClub));
    } else {
        res.status(404).send(response.form(req, 'Requested club was not found...'));
    };
});

module.exports = router;
