const http = require('http');
const js2xmlparser = require("js2xmlparser");

const checkValidity = require('./models/secondary/check-validity');
const parseUrl = require('./models/secondary/parse-url');
const handleGetRequest = require('./models/secondary/handle-get-request');

const server = http.createServer();

server.on('request', async(req, res) => {
    let acceptHeader = req.headers['accept'].split(',');
    if (checkValidity.url(req.method, req.url)) {
        if (req.method == 'GET') {
            let response = await handleGetRequest.get(req);
            if (response != 404) {
                await res.writeHead(200);
                res.end(formResponse(acceptHeader, response));
            } else {
                await res.writeHead(404);
                res.end(formResponse(acceptHeader, 'Requested entity was not found...'));
            }
        } else {
            req.on('data', async(body) => {
                let responseCode = await parseUrl.url(req, body.toString());
                switch (responseCode) {
                    case 200: {
                        await res.writeHead(200);
                        res.end(formResponse(acceptHeader,'Operation completed successfully!'));
                    }
                    case 404: {
                        await res.writeHead(404);
                        res.end(formResponse(acceptHeader, 'Requested entity was not found...'));
                    }
                    case 409: {
                        await res.writeHead(409);
                        res.end(formResponse(acceptHeader, 'Probably, you made a mistake in a query...'));
                    }
                };
            });
        }
    } else {
        await res.writeHead(404);
        res.end(formResponse(acceptHeader, 'Requested link is not valid...'));
    };
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
