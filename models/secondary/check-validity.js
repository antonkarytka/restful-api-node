const methodUrl = {
    'GET': new RegExp(/^\/(\bclubs\b|\bplayers\b|\bdoctors\b)(\/[0-9]+)*/),
    'POST': new RegExp(/^[/]+$/),
    'PUT': new RegExp(/^[/]+$/),
    'DELETE': new RegExp(/^[/]+$/)
};

module.exports = {
    url : (method, url) => {
        if (url.match(methodUrl[method])) {
            return true;
        } else {
            return false;
        };
    }
}
