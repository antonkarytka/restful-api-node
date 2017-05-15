const acceptableUrls = {
    'GET': new RegExp(/^\/([a-zA-Z]+){1}(\/[0-9]+)?/),
    'POST': new RegExp(/^[/]+$/),
    'PUT': new RegExp(/^[/]+$/),
    'DELETE': new RegExp(/^[/]+$/)
};

module.exports = {
    url : (method, url) => {
        if (url.match(acceptableUrls[method])) {
            return true;
        } else {
            return false;
        };
    }
}
