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

    sendContent(content) {
        const httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            return alert('Cannot create an XMLHTTP instance');
        };

        httpRequest.open(this.method, `${this.host}/${this.path}`);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(content);
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
    const div = document.getElementById('div');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    };
    const unorderedList = document.createElement('ul');
    for (let key in objects) {
        const button = document.createElement('button');
        button.innerHTML = key;
        button.onclick = () => {
            const keyword = key.split(' ')[0];
            if (keyword == 'Create') {
                const form = document.createElement('form');
                const textarea = document.createElement('textarea');
                textarea.autofocus = true;
                textarea.cols = 30;
                textarea.rows = 10;
                textarea.value = '{\n\n}'
                const submitButton = document.createElement('button'); 
                submitButton.innerHTML = 'Submit';
                submitButton.onclick = () => {
                    const ajaxRequest = new AjaxRequest('POST', `${objects[key][0].href}`);
                    ajaxRequest.sendContent(textarea.value);
                };
                form.appendChild(textarea);
                form.appendChild(submitButton);
                div.appendChild(form);
            } else {
                const ajaxRequest = new AjaxRequest(getMethod(key.split(' ')[0]), `${objects[key][0].href}`);
                ajaxRequest.getObjectInfo();
            };
        };
        const item = document.createElement('li');
        item.appendChild(button);
        unorderedList.appendChild(item);
    };
    createGoToMainMenuButton(unorderedList);
    return unorderedList;    
};

function createObjectPropertiesUL(fields, links) {
    const div = document.getElementById('div');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    };
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
            const keyword = key.split(' ')[0];
            if (keyword == 'Update') {
                const form = document.createElement('form');
                const textarea = document.createElement('textarea');
                textarea.autofocus = true;
                textarea.cols = 30;
                textarea.rows = 10;
                textarea.value = '{\n\n}'
                const submitButton = document.createElement('button'); 
                submitButton.innerHTML = 'Submit';
                submitButton.onclick = () => {
                    const ajaxRequest = new AjaxRequest('PUT', `${links[key][0].href}`);
                    ajaxRequest.sendContent(textarea.value);
                };
                form.appendChild(textarea);
                form.appendChild(submitButton);
                div.appendChild(form);
            } else {
                const ajaxRequest = new AjaxRequest(getMethod(keyword), `${links[key][0].href}`);
                ajaxRequest.getObjectInfo();
            };
        };
        const item = document.createElement('li');
        item.appendChild(button);
        unorderedList.appendChild(item);
    };
    createGoToMainMenuButton(unorderedList);
    return unorderedList;
};

function createGoToMainMenuButton(unorderedList) {
    const button = document.createElement('button');
    button.innerHTML = 'GO TO MAIN MENU';
    button.onclick = () => {
        const ajaxRequest = new AjaxRequest('GET', '')
        ajaxRequest.getEntitiesList();
    };
    const item = document.createElement('li');
    item.appendChild(button);
    unorderedList.appendChild(item);
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