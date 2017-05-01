const express = require('express');
const router = express.Router();

const parseRequestJson = require('../models/secondary/parse-request-json');
const parseRequestXml = require('../models/secondary/parse-request-xml');

router.post('/', async(req, res) => {
    let responseCode = 0;
    let contentType = req.headers['content-type'];
    switch (contentType) {
        case 'application/json':
            responseCode = await parseRequestJson.create(req.body);
            break;
        case 'application/xml':
            responseCode = await parseRequestXml.create(req.body);
            break;
        case 'text/xml':
            responseCode = await parseRequestXml.create(req.body);
            break;
        default:
            res.status(409).send(`${contentType} content-type is not supported yet...`)
    };
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
    let responseCode = 0;
    let contentType = req.headers['content-type'];
    switch (contentType) {
        case 'application/json':
            responseCode = await parseRequestJson.create(req.body);
            break;
        case 'application/xml':
            responseCode = await parseRequestXml.create(req.body);
            break;
        case 'text/xml':
            responseCode = await parseRequestXml.create(req.body);
            break;
        default:
            res.status(409).send(`${contentType} content-type is not supported yet...`)
    };
    if (responseCode == 200) {
        res.status(200).send('UPDATE query completed successfully!');
    } else {
        res.status(404).send('Requested entity was not found...');
    };
});

router.delete('/', async(req, res) => {
    let responseCode = 0;
    let contentType = req.headers['content-type'];
    switch (contentType) {
        case 'application/json':
            responseCode = await parseRequestJson.create(req.body);
            break;
        case 'application/xml':
            responseCode = await parseRequestXml.create(req.body);
            break;
        case 'text/xml':
            responseCode = await parseRequestXml.create(req.body);
            break;
        default:
            res.status(409).send(`${contentType} content-type is not supported yet...`)
    };
    if (responseCode == 200) {
        res.status(200).send('DELETE query completed successfully!');
    } else {
        res.status(404).send('Requested entity was not found...');
    };
});

module.exports = router;
