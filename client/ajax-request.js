const halfred = require('halfred');

class AjaxRequest {

    constructor(method, path) {
        this.method = method;
        this.path = path;
        this.host = 'http://127.0.0.1:3000';
    };

    getEntitiesList() {
        const httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            return alert('Cannot create an XMLHTTP instance');
        };
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    const response = halfred.parse(JSON.parse(httpRequest.responseText));
                    const entities = Object.keys(response.allLinks());
                    const ul = createEntitiesUL(entities);
                    document.getElementById('div').appendChild(ul);
                } else {
                    alert('There was a problem with the request.');
                };
            };
        };
        httpRequest.open(this.method, `${this.host}`);
        httpRequest.send();
    };

    getObjectsList() {
        const httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            return alert('Cannot create an XMLHTTP instance');
        };
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    const response = JSON.parse(httpRequest.responseText);
                    const parsedResponse = halfred.parse(response);
                    const ul = createObjectsUL(this.path, parsedResponse.allLinks());
                    document.getElementById('div').appendChild(ul);
                } else {
                    alert('There was a problem with the request.');
                };
            };
        };
        httpRequest.open(this.method, `${this.host}/${this.path}`);
        httpRequest.send();
    };

    getObjectInfo() {
        const httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            return alert('Cannot create an XMLHTTP instance');
        };
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    const response = JSON.parse(httpRequest.responseText);
                    const parsedResponse = halfred.parse(response);
                    const fields = {};
                    for (let key in response) {
                        if (key != '_links')
                            fields[key] = response[key];
                    };
                    const links = {};
                    const allLinks = parsedResponse.allLinks(); 
                    for (let key in allLinks) {
                        links[key] = allLinks[key];
                    };
                    const ul = createObjectPropertiesUL(fields, links);
                    document.getElementById('div').appendChild(ul);
                } else {
                    alert('There was a problem with the request.');
                };
            };
        };
        httpRequest.open(this.method, `${this.host}/${this.path}`);
        httpRequest.send();
    };
};


function createEntitiesUL(entities) {
    const div = document.getElementById('div');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    };
    const unorderedList = document.createElement('ul');
    entities.map(entity => {
        const button = document.createElement('button');
        button.innerHTML = entity;
        button.onclick = () => {
            const ajaxRequest = new AjaxRequest('GET', entity);
            ajaxRequest.getObjectsList();
        };
        const item = document.createElement('li');
        item.appendChild(button);
        unorderedList.appendChild(item);
        div.appendChild(unorderedList);
    });
    return unorderedList;
};

function createObjectsUL(entity, objects) {
    const unorderedList = document.createElement('ul');
    for (let key in objects) {
        const button = document.createElement('button');
        button.innerHTML = key;
        button.onclick = () => {
            const ajaxRequest = new AjaxRequest('GET', `${objects[key][0].href}`);
            ajaxRequest.getObjectInfo();
        };
        const item = document.createElement('li');
        item.appendChild(button);
        unorderedList.appendChild(item);
    };
    return unorderedList;
};

function createObjectPropertiesUL(fields, links) {
    const unorderedList = document.createElement('ul');
    for (let key in fields) {
        const text = document.createTextNode(`${key}: ${fields[key]}`);
        const item = document.createElement('li');
        item.appendChild(text);
        unorderedList.appendChild(item);
    };

    for (let key in links) {
        const button = document.createElement('button');
        button.innerHTML = key;
        button.onclick = () => {
            const ajaxRequest = new AjaxRequest(getMethod(key.split(' ')[0]), `${links[key][0].href}`);
            ajaxRequest.getObjectInfo();
        };
        const item = document.createElement('li');
        item.appendChild(button);
        unorderedList.appendChild(item);
    };
    return unorderedList;
};

function getMethod(keyword) {
    switch (keyword) {
        case 'Create':
        case 'Add':
            return 'POST';
        case 'Update':
            return 'PUT';
        case 'Delete':
        case 'Remove':
            return 'DELETE';
        default:
            return 'GET';
    };
};


module.exports = AjaxRequest;