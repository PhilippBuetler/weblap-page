var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const errorHandler = require('./_helpers/error-handler');

require('dotenv').config();
console.dir(process.env);

var app = express();

//process.env.MONGODB_CONNECTIONSTRING = 'mongodb+srv://admin:Abcd1234@cluster0-t99vz.mongodb.net/test?retryWrites=true&w=majority';

app.use('/uploads', express.static('uploads'));

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/frontpage', require('./frontpage/frontpage.controller'));
app.use('/user', require('./user/user.controller'));
app.use('/transaction', require('./transaction/transaction.controller'));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.use(errorHandler);

app.set('port', 1234);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


