const express = require('express');
const router = express.Router();

const read = require('../models/read');
const response = require('../models/secondary/response');

router.get('/:id', async(req, res) => {
    let url = req.originalUrl;
    let playerId = url.split('/').pop();
    let readPlayer = await read.player(playerId);
    if (readPlayer != 404) {
        res.status(200).send(response.form(req, readPlayer));
    } else {
        res.status(404).send(response.form(req, 'Requested player was not found...'));
    };
});

module.exports = router;
