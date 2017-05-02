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
                res.writeHead(200);
                res.write(response);
                res.end();
            } else {
                res.writeHead(404);
                res.write('Requested entity was not found...');
                res.end();
            }
        } else {
            req.on('data', data => {
                console.log(data.toString());
                /*
                let responseCode = await parseUrl.url(req);
                switch (responseCode) {
                case 200:
                res.writeHead(200);
                res.write('Operation completed successfully!');
                res.end();
                case 404:
                res.writeHead(404);
                res.write('Requested entity was not found...');
                res.end();
                case 409:
                res.writeHead(409);
                res.write('Probably, you made a mistake in a query...');
                res.end();
                };*/
            });
        }
    } else {
        res.writeHead(404);
        res.write('Requested link is not valid...');
        res.end();
    };
});

server.listen(3000, 'localhost', () => console.log('Server running on 3000...'));

module.exports = server;
