const AjaxRequest = require('./ajax-request');

window.onload = () => {
    const ajaxRequest = new AjaxRequest('GET', '')
    ajaxRequest.getEntitiesList();
};