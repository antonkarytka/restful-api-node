const http = require('http');
const url = require('url');

const checkValidity = require('./models/secondary/check-validity');
const parseUrl = require('./models/secondary/parse-url');
const handleGetRequest = require('./models/secondary/handle-get-request');

const server = http.createServer();

server.on('request', async(req, res) => {
    if (checkValidity.url(req.method, req.url)) {
        if (req.method == 'GET') {
            let response = await handleGetRequest.get(req);
            if (response != 404) {
                await res.writeHead(200);
                res.end(response);
            } else {
                await res.writeHead(404);
                res.end('Requested entity was not found...');
            }
        } else {
            req.on('data', async(body) => {
                let responseCode = await parseUrl.url(req, body.toString());
                switch (responseCode) {
                    case 200: {
                        await res.writeHead(200);
                        res.end('Operation completed successfully!');
                    }
                    case 404: {
                        await res.writeHead(404);
                        res.end('Requested entity was not found...');
                    }
                    case 409: {
                        await res.writeHead(409);
                        res.end('Probably, you made a mistake in a query...');
                    }
                };
            });
        }
    } else {
        await res.writeHead(404);
        res.end('Requested link is not valid...');
    };
});

server.listen(3000, 'localhost', () => console.log('Server running on 3000...'));

module.exports = server;
