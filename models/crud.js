const orm = require('../orm/orm.js');
const read = require('./read');

module.exports = {
    createObject: async(entity, objectName) => {
        if (await entityExists(entity)) {
            let model = convertToOrmModel(entity);
            let objectFound = await orm[model].find({ where: { name: objectName } });
            if (!objectFound) {
                await orm[model].create({ name: objectName });
                return 200;
            } else {
                return 409;
            };
        } else {
            return 404;
        };
    },

    readObject: async(entity, objectId) => {
        if (await entityExists(entity)) {
            try {
                return await read[entity](objectId);
            } catch (e) {
                return 404;
            };
        } else {
            return 404;
        };
    },

    readAllEntityObjects: async(entity) => {
        if (await entityExists(entity)) {
            let entitySingular = entity.slice(0, -1);
            let model = entitySingular.charAt(0).toUpperCase() + entitySingular.slice(1);
            let objects = await orm[model].findAll();
            let objectsList = {
                [`${entity}`]: objects.map(object => { return `${object.name} (${object.id})` })
            };
            return objectsList;
        } else {
            return 404;
        };
    },

    updateObjectFields: async(entity, objectId, reqBody) => {
        if (await entityExists(entity)) {
            let entitySingular = entity.slice(0, -1);
            let model = entitySingular.charAt(0).toUpperCase() + entitySingular.slice(1);
            let object = await orm[model].find({ where: { id: objectId } });
            if (object) {
                let modelAttributes = [];
                for (let key in orm[model].rawAttributes) {
                    modelAttributes.push(key);
                };
                for (key in reqBody) {
                    if (!(modelAttributes.includes(key))) {
                        return 409;
                    };
                };
                for (key in reqBody) {
                    await object.update( { [key]: reqBody[key] } );
                };
                return 200;
            } else {
                return 404;
            };
        } else {
            return 404;
        };
    },

    addRelation: async(firstEntity, firstObjectId, secondEntity, secondObjectId) => {
        if (await entityExists(firstEntity) && (await entityExists(secondEntity))) {
            let firstModel = convertToOrmModel(firstEntity);
            let secondModel = convertToOrmModel(secondEntity);
            let firstObject = await orm[firstModel].find({ where: { id: firstObjectId } });
            let secondObject = await orm[secondModel].find({ where: { id: secondObjectId } });
            if (firstObject && secondObject) {
                try {
                    await firstObject[`add${secondModel}`](secondObject);
                } catch (e) {
                    await firstObject[`set${secondModel}`](secondObject);
                };
                return 200;
            } else {
                return 404;
            };
        } else {
            return 404;
        };
    },

    deleteRelation: async(firstEntity, firstObjectId, secondEntity, secondObjectId) => {
        if (await entityExists(firstEntity) && (await entityExists(secondEntity))) {
            let firstModel = convertToOrmModel(firstEntity);
            let secondModel = convertToOrmModel(secondEntity);
            let firstObject = await orm[firstModel].find({ where: { id: firstObjectId } });
            let secondObject = await orm[secondModel].find({ where: { id: secondObjectId } });
            if (firstObject && secondObject) {
                try {
                    let entities = await firstObject[`get${secondModel}s`]();
                    let deletionIndex = entities.indexOf(firstObject.name);
                    entities.splice(deletionIndex, 1);
                    await firstObject[`set${secondModel}s`](entities);
                } catch (e) {
                    await firstObject[`set${secondModel}`](null);
                };
                return 200;
            } else {
                return 404;
            };
        } else {
            return 404;
        };
    },

    deleteObject: async(entity, objectId) => {
        if (await entityExists(entity)) {
            let model = convertToOrmModel(entity);
            let entityFound = await orm[model].find({ where: { id: objectId } });
            if (entityFound) {
                await orm[model].destroy({ where: { id: objectId } });
                return 200;
            } else {
                return 409;
            };
        } else {
            return 404;
        };
    }
}

async function entityExists(entity) {
    let existingEntities = await orm.sequelize.query('SELECT name FROM sqlite_master WHERE type="table"');
    if (existingEntities.includes(entity)) {
        return true;
    } else {
        return false;
    };
};

function convertToOrmModel(entity) {
    let entitySingular = entity.slice(0, -1);
    let model = entitySingular.charAt(0).toUpperCase() + entitySingular.slice(1);
    return model;
};
