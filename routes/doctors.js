const express = require('express');
const router = express.Router();

const read = require('../models/crud/read');
const show = require('../models/secondary/show');
const response = require('../models/secondary/response');

router.get('/', async(req, res) => {
    res.send(await show.doctors());
});

router.get('/:id', async(req, res) => {
    let url = req.originalUrl;
    let doctorId = url.split('/').pop();
    let readDoctor = await read.doctor(doctorId);
    if (readDoctor != 404) {
        res.status(200).send(response.form(req, readDoctor));
    } else {
        res.status(404).send(response.form(req, 'Requested doctor was not found...'));
    };
});

module.exports = router;
