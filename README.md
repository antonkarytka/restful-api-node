# Node.js RESTful API

## Entities
There are 3 models in the ORM:
* football club
* players
* doctors

They have the following references:
* 1:N - football club : players   
* 1:N - football club : doctors
* N:N - players : doctors

## Request Methods
The following HTTP Request Methods are supported:
* POST (create object, add relation)
* GET (read object, read all objects)
* PUT (edit object's field)
* DELETE (delete object, delete relation)

## Request Content-Type
Two content types of requests are supported:
* JSON
* XML

## Request API

### CREATE object
```
POST host/{entity}
```
Creates an object of {entity} type with the fields sent in the request body. Request body should contain object's fields.  
Request's body example:
```
{
  "name":"Object name"
}
```
```
<name>Object name</name>
```

### READ all objects of one type
```
GET host/{entity}
```
Returns a list of existing objects of {entity} type.  
No request body needed.  

### READ object by id
```
GET host/{entity}/{objectId}
```
Returns info about the object of {entity} type with {objectId} id.  
No request body needed.  

### UPDATE object's fields
```
PUT host/{entity}/{objectId}
```
Updates all the fields, sent in request body, of an object of {entity} type with {objectId} id.  
Request's body example:
```
{
  "name":"New object's name"
}
```
```
<name>New object's name</name>
```

### ADD relation
```
POST host/{firstEntity}/{firstObjectId}/{secondEntity}/{secondObjectId}
```
Links two objects - of {firstEntity} type with {firstObjectId} and of {secondEntity} type with {secondObjectId}.  
No request body needed.

### DELETE relation
```
DELETE host/{firstEntity}/{firstObjectId}/{secondEntity}/{secondObjectId}
```
Deletes relation between two objects - of {firstEntity} type with {firstObjectId} and of {secondEntity} type with {secondObjectId}.  
No request body needed.  

### DELETE object
```
DELETE host/{entity}/{objectId}
```
Deletes an object of {entity} type with {objectId} id.  
No request body needed.    <br/>

Entities can be added by defining a model in /orm/orm.js and creating an appropriate function in /models/read.js.
