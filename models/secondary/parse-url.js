const handleRequestJson = require('./handle-request-json');
const handleRequestXml = require('./handle-request-xml');
const xml = require('pixl-xml');

module.exports = {
    url : async(req, body) => {
        switch (req.method) {
            case 'POST': {
                let responseCode = 0;
                let contentType = req.headers['content-type'];
                switch (contentType) {
                    case 'application/json':
                        responseCode = await handleRequestJson.create(JSON.parse(body));
                        break;
                    case 'application/xml': {
                        responseCode = await handleRequestXml.create(xml.parse(body));
                        break;
                    }
                    case 'text/xml':
                        responseCode = await handleRequestXml.create(xml.parse(body));
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
                        responseCode = await handleRequestJson.update(JSON.parse(body));
                        break;
                    case 'application/xml':
                        responseCode = await handleRequestXml.update(xml.parse(body));
                        break;
                    case 'text/xml':
                        responseCode = await handleRequestXml.update(xml.parse(body));
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
                        responseCode = await handleRequestJson.delete(JSON.parse(body));
                        break;
                    case 'application/xml':
                        responseCode = await handleRequestXml.delete(xml.parse(body));
                        break;
                    case 'text/xml':
                        responseCode = await handleRequestXml.delete(xml.parse(body));
                        break;
                    default:
                        return 409;
                };
                return responseCode;
            }
            default:
                return 404;
        };
    }
}
