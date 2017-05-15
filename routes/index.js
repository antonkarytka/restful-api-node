const express = require('express');
const router = express.Router();
const js2xmlparser = require('js2xmlparser');

const orm = require('../orm/orm');
const crud = require('../models/crud');
const read = require('../models/read');

router.post('/:entity', async(req, res) => {
    let entityType = req.params.entity;
    let entityName = req.body.name;
    let responseCode = await crud.createObject(entityType, entityName);
    if (responseCode == 200) {
        res.status(200).send(formResponse(req, `${entityName} has been created successfully!`));
    } else if (responseCode == 409) {
        res.status(409).send(formResponse(req, `${entityName} already exists...`));
    } else {
        res.status(404).send(formResponse(req, `${entityType} does not exist...`));
    };
});

router.post('/:firstEntity/:firstObjectId/:secondEntity/:secondObjectId', async(req, res) => {
    let firstEntity = req.params.firstEntity;
    let firstObjectId = req.params.firstObjectId;
    let secondEntity = req.params.secondEntity;
    let secondObjectId = req.params.secondObjectId;
    let responseCode = await crud.addRelation(firstEntity, firstObjectId, secondEntity, secondObjectId);
    if (responseCode == 200) {
        res.status(200).send(formResponse(req, 'Relation has been added successfully!'));
    } else {
        res.status(404).send(formResponse(req, 'Not found...'));
    };
});

router.get('/:entity', async(req, res) => {
    let entity = req.params.entity;
    let response = await crud.readAllEntityObjects(entity);
    if (response != 404) {
        await res.status(200).send(formResponse(req, response));
    } else {
        await res.status(404).send(`Not found...`)
    };
});

router.get('/:entity/:id', async(req, res) => {
    let entity = req.params.entity;
    let id = req.params.id;
    let response = await crud.readObject(entity, id);
    if (response != 404) {
        await res.status(200).send(formResponse(req, response));
    } else {
        await res.status(404).send(`Not found...`)
    };
});

router.put('/:entity/:id', async(req, res) => {
    let entity = req.params.entity;
    let id = req.params.id;
    let reqBody = req.body;
    let responseCode = await crud.updateObjectFields(entity, id, reqBody);
    if (responseCode == 200) {
        await res.status(200).send(formResponse(req, 'Object has been updated successfully!'));
    } else if (responseCode == 409) {
        await res.status(409).send(formResponse(req, 'There are nonexistent fields in the request body...'))
    } else {
        await res.status(404).send(`Not found...`)
    };
});

router.delete('/:entity/:id', async(req, res) => {
    let entityType = req.params.entity;
    let entityId = req.params.id;
    let responseCode = await crud.deleteObject(entityType, entityId);
    if (responseCode == 200) {
        res.status(200).send(formResponse(req, `Object has been deleted successfully!`));
    } else if (responseCode == 409) {
        res.status(404).send(formResponse(req, `Object was not found...`));
    } else {
        res.status(404).send(formResponse(req, `${entityType} does not exist...`));
    };
});

router.delete('/:firstEntity/:firstObjectId/:secondEntity/:secondObjectId', async(req, res) => {
    let firstEntity = req.params.firstEntity;
    let firstObjectId = req.params.firstObjectId;
    let secondEntity = req.params.secondEntity;
    let secondObjectId = req.params.secondObjectId;
    let responseCode = await crud.deleteRelation(firstEntity, firstObjectId, secondEntity, secondObjectId);
    if (responseCode == 200) {
        res.status(200).send(formResponse(req, 'Relation has been deleted successfully!'));
    } else {
        res.status(404).send(formResponse(req, 'Not found...'));
    };
});

module.exports = router;

function formResponse(req, responseData) {
    if (req.accepts('application/json')) {
        return JSON.stringify(responseData, null, 4);
    } else if (req.accepts('application/xml')) {
        return js2xmlparser.parse('result', responseData);
    } else {
        return JSON.stringify(responseData, null, 4);
    };
}
