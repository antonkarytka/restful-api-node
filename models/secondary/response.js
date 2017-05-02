const js2xmlparser = require('js2xmlparser');

module.exports = {
    form : (req, responseData) => {
        if (req.accepts('application/json')) {
            return JSON.stringify(responseData, null, 4);
        } else if (req.accepts('application/xml')) {
            return js2xmlparser.parse('result', responseData);
        } else {
            return JSON.stringify(responseData, null, 4);
        };
    }
}
