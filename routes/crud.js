const express = require('express');
const router = express.Router();

const create = require('../models/crud/create');
const read = require('../models/crud/read');
const update = require('../models/crud/update');
const del = require('../models/crud/delete');

router.post('/', async(req, res) => {
    try {
        let query = [];
        switch (Object.keys(req.body)[0]) {
            case 'club':
                await create.club(req.body.club);
                break;
            case 'player':
                query.push(req.body.player);
                for (let i = 0; i < Object.keys(req.body).length - 2; i++)
                    query.push(req.body.doctor);
                query.push(req.body.club);
                await create.player(query);
                break;
            case 'doctor':
                query.push(req.body.doctor);
                for (let i = 1; i < Object.keys(req.body).length - 1; i++)
                    query.push(req.body.player);
                query.push(req.body.club);
                await create.doctor(query);
                break;
            default:
                throw new Error('Unavailable entity requested.');
                break;
        };
        res.status(200).send('Operation completed successfully!');
    } catch (e) {
        res.status(404);
    };
});

router.put('/', async(req, res) => {

});

router.delete('/', async(req, res) => {
    try {
        switch (Object.keys(req.body)[0]) {
            case 'club':
                await del.club(req.body.club);
                break;
            case 'player':
                await del.player(req.body.player);
                break;
            case 'doctor':
                await del.doctor(req.body.doctor);
                break;
            default:
                throw new Error('Unavailable entity requested.');
                break;
        };
        res.status(200).send('Operation completed successfully!');
    } catch (e) {
        res.status(404);
    };
});

module.exports = router;
