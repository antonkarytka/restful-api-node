const http = require('http');
const js2xmlparser = require("js2xmlparser");

const checkValidity = require('./models/secondary/check-validity');
const crud = require('./models/crud');
const read = require('./models/read');

const server = http.createServer();

server.on('request', async(req, res) => {
    let acceptHeader = req.headers['accept'].split(',');
    let response = '';
    let dataReceived = '';
    let urlParts = req.url.split('/');
    urlParts.shift();

    req.on('data', data => {
        dataReceived = JSON.parse(data.toString());
    });

    req.on('end', async() => {
        switch (req.method) {
        case 'GET': {
            if (urlParts.length == 1) {
                response = await crud.readAllEntityObjects(urlParts[0]);
            } else if (urlParts.length == 2) {
                response = await crud.readObject(urlParts[0], urlParts[1]);
            };
            break;
        };
        case 'POST': {
            if (urlParts.length == 1) {
                response = await crud.createObject(urlParts[0], dataReceived);
                dataReceived = '';
            } else if (urlParts.length == 4) {
                response = await crud.addRelation(urlParts[0], urlParts[1], urlParts[2], urlParts[3]);
            };
            break;
        };
        case 'PUT': {
            response = await crud.updateObjectFields(urlParts[0], urlParts[1], dataReceived);
            dataReceived = '';
            break;
        };
        case 'DELETE': {
            if (urlParts.length == 2) {
                response = await crud.deleteObject(urlParts[0], urlParts[1]);
            } else if (urlParts.length == 4){
                response = await crud.deleteRelation(urlParts[0], urlParts[1], urlParts[2], urlParts[3])
            };
            break;
        };
        default: {
            await res.writeHead(404);
            res.end(formResponse(acceptHeader, `${req.method} is not supported yet...`));
        };
    };

    switch (response) {
        case 200:
            await res.writeHead(200);
            res.end(formResponse(acceptHeader, 'Operation has been completed successfully!'));
            break;
        case 409:
            await res.writeHead(409);
            res.end(formResponse(acceptHeader, 'Conflict'));
            break;
        case 404:
            await res.writeHead(404);
            res.end(formResponse(acceptHeader, 'Not found...'));
            break;
        default:
            await res.writeHead(200);
            res.end(formResponse(acceptHeader, response));
    }
    })
    //if (checkValidity.url(req.method, req.url)) {


    /*} else {
        await res.writeHead(404);
        res.end(formResponse(acceptHeader, 'Requested link is not valid...'));
    };*/
});

server.listen(3000, 'localhost', () => console.log('Server running on 3000...'));


function formResponse(acceptHeader, responseData) {
    if (acceptHeader.includes('application/json')) {
        return JSON.stringify(responseData, null, 4);
    } else if (acceptHeader.includes('application/xml')) {
        return js2xmlparser.parse('result', responseData);
    } else {
        return JSON.stringify(responseData, null, 4);
    }
}

module.exports = server;
