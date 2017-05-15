const orm = require('../orm/orm.js');

module.exports = {
    createObject: async(entityType, entityName) => {
        if (await entityTypeExists(entityType)) {
            let modelType = convertToOrmModelType(entityType);
            let entityFound = await orm[modelType].find({ where: { name: entityName } });
            if (!entityFound) {
                await orm[modelType].create({ name: entityName });
                return 200;
            } else {
                return 409;
            };
        } else {
            return 404;
        };
    },

    addRelation: async(firstEntityType, firstEntityId, secondEntityType, secondEntityId) => {
        if (await entityTypeExists(firstEntityType) && (await entityTypeExists(secondEntityType))) {
            let firstModelType = convertToOrmModelType(firstEntityType);
            let secondModelType = convertToOrmModelType(secondEntityType);
            let firstEntity = await orm[firstModelType].find({ where: { id: firstEntityId } });
            let secondEntity = await orm[secondModelType].find({ where: { id: secondEntityId } });
            if (firstEntity && secondEntity) {
                try {
                    await firstEntity[`add${secondModelType}`](secondEntity);
                } catch (e) {
                    await firstEntity[`set${secondModelType}`](secondEntity);
                };
                return 200;
            } else {
                return 404;
            };
        } else {
            return 404;
        };
    },

    deleteRelation: async(firstEntityType, firstEntityId, secondEntityType, secondEntityId) => {
        if (await entityTypeExists(firstEntityType) && (await entityTypeExists(secondEntityType))) {
            let firstModelType = convertToOrmModelType(firstEntityType);
            let secondModelType = convertToOrmModelType(secondEntityType);
            let firstEntity = await orm[firstModelType].find({ where: { id: firstEntityId } });
            let secondEntity = await orm[secondModelType].find({ where: { id: secondEntityId } });
            if (firstEntity && secondEntity) {
                let entities = await firstEntity[`get${secondModelType}s`]();
                let deletionIndex = entities.indexOf(firstEntity.name);
                entities.splice(deletionIndex, 1);
                await firstEntity[`set${secondModelType}s`](entities);
                return 200;
            } else {
                return 404;
            };
        } else {
            return 404;
        };
    },

    deleteObject: async(entityType, entityId) => {
        if (await entityTypeExists(entityType)) {
            let modelType = convertToOrmModelType(entityType);
            let entityFound = await orm[modelType].find({ where: { id: entityId } });
            if (entityFound) {
                await orm[modelType].destroy({ where: { id: entityId } });
                return 200;
            } else {
                return 409;
            };
        } else {
            return 404;
        };
    }
}

async function entityTypeExists(entityType) {
    let existingEntityTypes = await orm.sequelize.query('SELECT name FROM sqlite_master WHERE type="table"');
    if (existingEntityTypes.includes(entityType)) {
        return true;
    } else {
        return false;
    };
};

function convertToOrmModelType(entityType) {
    let entityTypeSingular = entityType.slice(0, -1);
    let modelType = entityTypeSingular.charAt(0).toUpperCase() + entityTypeSingular.slice(1);
    return modelType;
}
