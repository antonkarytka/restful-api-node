const handleRequestJson = require('./handle-request-json');
const handleRequestXml = require('./handle-request-xml');

module.exports = {
    url : async(req) => {
        let urlParts = req.url.split('/');
        if (urlParts.length == 0) {
            switch (req.method) {
                case 'POST': {
                    let responseCode = 0;
                    let contentType = req.headers['content-type'];
                    switch (contentType) {
                        case 'application/json':
                            responseCode = await handleRequestJson.create(req.body);
                            break;
                        case 'application/xml':
                            responseCode = await handleRequestXml.create(req.body);
                            break;
                        case 'text/xml':
                            responseCode = await handleRequestXml.create(req.body);
                            break;
                        default:
                            return 409;
                    };
                    return responseCode;
                }
                case 'PUT': {
                    let responseCode = 0;
                    let contentType = req.headers['content-type'];
                    switch (contentType) {
                        case 'application/json':
                            responseCode = await handleRequestJson.update(req.body);
                            break;
                        case 'application/xml':
                            responseCode = await handleRequestXml.update(req.body);
                            break;
                        case 'text/xml':
                            responseCode = await handleRequestXml.update(req.body);
                            break;
                        default:
                            return 409;
                    };
                    return responseCode;
                }
                case 'DELETE': {
                    let responseCode = 0;
                    let contentType = req.headers['content-type'];
                    switch (contentType) {
                        case 'application/json':
                            responseCode = await handleRequestJson.delete(req.body);
                            break;
                        case 'application/xml':
                            responseCode = await handleRequestXml.delete(req.body);
                            break;
                        case 'text/xml':
                            responseCode = await handleRequestXml.delete(req.body);
                            break;
                        default:
                            return 409;
                    };
                    return responseCode;
                }
                default:
                    return 404;
            };
        } else {
            return 404;
        }
    }
}
