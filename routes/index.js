const express = require('express');
const router = express.Router();

const crud = require('../models/crud');
const read = require('../models/read');

router.post('/:entity', async(req, res) => {
    const entity = req.params.entity;
    const objectName = req.body.name;
    const objectId = await crud.createObject(entity, objectName);
    if (objectId != 404) {
        const response = await read[entity](objectId);
        res.set('Content-Type', 'application/hal+json');
        res.status(200).send(response);
    } else {
        res.set('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify(`${entityType} does not exist...`));
    };
});

router.post('/:firstEntity/:firstObjectId/:secondEntity/:secondObjectId', async(req, res) => {
    const firstEntity = req.params.firstEntity;
    const firstObjectId = req.params.firstObjectId;
    const secondEntity = req.params.secondEntity;
    const secondObjectId = req.params.secondObjectId;
    const responseCode = await crud.addRelation(firstEntity, firstObjectId, secondEntity, secondObjectId);
    if (responseCode == 200) {
        const response = await read[firstEntity](firstObjectId);
        res.set('Content-Type', 'application/hal+json');
        res.status(200).send(response);
    } else {
        res.set('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify('Not found...'));
    };
});

router.get('/:entity', async(req, res) => {
    const entity = req.params.entity;
    const response = await crud.readAllEntityObjects(entity);
    if (response != 404) {
        res.set('Content-Type', 'application/hal+json');
        res.status(200).send(response);
    } else {
        res.status(404).send(`Not found...`)
    };
});

router.get('/:entity/:id', async(req, res) => {
    const entity = req.params.entity;
    const id = req.params.id;
    const response = await crud.readObject(entity, id);
    res.set('Content-Type', 'application/hal+json');
    if (response != 404) {
        await res.status(200).send(response);
    } else {
        await res.status(404).send(`Not found...`)
    };
});

router.put('/:entity/:id', async(req, res) => {
    const entity = req.params.entity;
    const id = req.params.id;
    const reqBody = req.body;
    const responseCode = await crud.updateObjectFields(entity, id, reqBody);
    if (responseCode == 200) {
        const response = await read[entity](id);
        res.set('Content-Type', 'application/hal+json');
        res.status(200).send(response);
    } else if (responseCode == 409) {
        res.set('Content-Type', 'application/json');
        res.status(409).send(JSON.stringify('There are nonexistent fields in the request body...'));
    } else {
        res.set('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify(`Not found...`));
    };
});

router.delete('/:entity/:id', async(req, res) => {
    const entity = req.params.entity;
    const entityId = req.params.id;
    const responseCode = await crud.deleteObject(entity, entityId);
    if (responseCode == 200) {
        const response = await crud.readAllEntityObjects(entity);
        res.set('Content-Type', 'application/hal+json');
        res.status(200).send(response);
    } else if (responseCode == 409) {   
        res.set('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify(`Object was not found...`));
    } else {
        res.set('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify(`${entity} does not exist...`));
    };
});

router.delete('/:firstEntity/:firstObjectId/:secondEntity/:secondObjectId', async(req, res) => {
    const firstEntity = req.params.firstEntity;
    const firstObjectId = req.params.firstObjectId;
    const secondEntity = req.params.secondEntity;
    const secondObjectId = req.params.secondObjectId;
    const responseCode = await crud.deleteRelation(firstEntity, firstObjectId, secondEntity, secondObjectId);
    if (responseCode == 200) {
        const response = await read[firstEntity](firstObjectId);
        res.set('Content-Type', 'application/hal+json');
        res.status(200).send(response);
    } else {
        res.set('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify('Not found...'));
    };
});

module.exports = router;
