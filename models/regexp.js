const CREATE_OBJECT = new RegExp(/^\/[a-zA-Z]+$/);
const READ_OBJECT = new RegExp(/^\/[a-zA-Z]+\/[0-9]+$/);
const READ_ALL_ENTITY_OBJECTS = new RegExp(/^\/[a-zA-Z]+$/);
const UPDATE_OBJECTS_FIELDS = new RegExp(/^\/[a-zA-Z]+\/[0-9]+$/);
const ADD_RELATION = new RegExp(/^\/[a-zA-Z]+\/[0-9]+\/[a-zA-Z]+\/[0-9]+$/);
const DELETE_RELATION = new RegExp(/^\/[a-zA-Z]+\/[0-9]+\/[a-zA-Z]+\/[0-9]+$/);
const DELETE_OBJECT = new RegExp(/^\/[a-zA-Z]+\/[0-9]+$/);

module.exports.CREATE_OBJECT = CREATE_OBJECT;
module.exports.READ_OBJECT = READ_OBJECT;
module.exports.READ_ALL_ENTITY_OBJECTS = READ_ALL_ENTITY_OBJECTS;
module.exports.UPDATE_OBJECTS_FIELDS = UPDATE_OBJECTS_FIELDS;
module.exports.ADD_RELATION = ADD_RELATION;
module.exports.DELETE_RELATION = DELETE_RELATION;
module.exports.DELETE_OBJECT = DELETE_OBJECT;
