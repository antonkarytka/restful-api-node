const express = require('express');
const router = express.Router();

const orm = require('../orm/orm');
const crud = require('../models/crud');
const read = require('../models/read');
const response = require('../models/secondary/response');

router.post('/:entity', async(req, res) => {
    let entityType = req.params.entity;
    let entityName = req.body.name;
    let responseCode = await crud.createObject(entityType, entityName);
    if (responseCode == 200) {
        res.status(200).send(response.form(req, `${entityName} was created successfully!`));
    } else if (responseCode == 409) {
        res.status(409).send(response.form(req, `${entityName} already exists...`));
    } else {
        res.status(404).send(response.form(req, `${entityType} does not exist...`));
    };
});

router.post('/:firstEntity/:firstEntityId/:secondEntity/:secondEntityId', async(req, res) => {
    let firstEntity = req.params.firstEntity;
    let firstEntityId = req.params.firstEntityId;
    let secondEntity = req.params.secondEntity;
    let secondEntityId = req.params.secondEntityId;
    let responseCode = await crud.addRelation(firstEntity, firstEntityId, secondEntity, secondEntityId);
    if (responseCode == 200) {
        res.status(200).send(response.form(req, 'Relation has been added successfully!'));
    } else {
        res.status(404).send(response.form(req, 'Not found...'));
    };
});

router.get('/:model', async(req, res) => {
    let model = req.params.model;
    let models = await orm.sequelize.query('SELECT name FROM sqlite_master WHERE type="table"');
    if (models.includes(model)) {
        let response = await read.allObjects(model);
        await res.status(200).send(JSON.stringify(response));
    } else {
        await res.status(404).send(`${model} was not found...`)
    };
});

router.delete('/:entity/:id', async(req, res) => {
    let entityType = req.params.entity;
    let entityId = req.params.id;
    let responseCode = await crud.deleteObject(entityType, entityId);
    if (responseCode == 200) {
        res.status(200).send(response.form(req, `Object was deleted successfully!`));
    } else if (responseCode == 409) {
        res.status(404).send(response.form(req, `Object was not found...`));
    } else {
        res.status(404).send(response.form(req, `${entityType} does not exist...`));
    };
});

router.delete('/:firstEntity/:firstEntityId/:secondEntity/:secondEntityId', async(req, res) => {
    let firstEntity = req.params.firstEntity;
    let firstEntityId = req.params.firstEntityId;
    let secondEntity = req.params.secondEntity;
    let secondEntityId = req.params.secondEntityId;
    let responseCode = await crud.deleteRelation(firstEntity, firstEntityId, secondEntity, secondEntityId);
    if (responseCode == 200) {
        res.status(200).send(response.form(req, 'Relation has been deleted successfully!'));
    } else {
        res.status(404).send(response.form(req, 'Not found...'));
    };
});

/*router.get('/:model/:id', async(req, res) => {
    let model = req.params.model;
    let modelId = req.params.id;
    let models = await orm.sequelize.query('SELECT name FROM sqlite_master WHERE type="table"');
    console.log(models);
    if (models.includes(model)) {
        let response = await read.object(model, modelId);
        await res.status(200).send(response);
    } else {
        await res.status(404).send(`${model} was not found...`)
    };
});*/

module.exports = router;
