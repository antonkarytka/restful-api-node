# Node.js RESTful API

## Improvements
This version of RESTful API supports HATEOAS - Hypermedia As The Engine Of Application State.  
Client doesn't need any APIs because server sends all the necessary data in the response's body.  

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
The only supported content type of requests is JSON.

## Response Content-Type
Server sends data in two content types: HAL+JSON or JSON.
