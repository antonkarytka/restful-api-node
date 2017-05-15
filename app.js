const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const index = require('./routes/index');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'node.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use((req, res, next) => {
    let err = new Error('Not Found...');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;
