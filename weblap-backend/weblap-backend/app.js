var express = require('express');
var path = require('path');
var multer = require('multer');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const errorHandler = require('./_helpers/error-handler');

var DIR = 'uploads/';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        let fileExtension = '';
        if (file.mimetype === 'image/png') {
            fileExtension = '.png';
        } else {
            fileExtension = '.jpg';
        }
        console.log(file.mimetype);
        cb(null, Date.now() + fileExtension); //Appending .jpg
    }
});

var upload = multer({ storage: storage }).single('photo');

require('dotenv').config();
console.dir(process.env);

var indexRouter = require('./routes/index');
var frontpageRouter = require('./routes/frontpage');

var FrontpageRepository = require('./routes/frontpage.repository');

var app = express();

//process.env.MONGODB_CONNECTIONSTRING = 'mongodb+srv://admin:Abcd1234@cluster0-t99vz.mongodb.net/test?retryWrites=true&w=majority';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
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

app.use('/', indexRouter);
app.use('/frontpage', frontpageRouter);
app.use('/users', require('./users/users.controller'));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.use(errorHandler);

app.post('/frontpage', (req, res) => {
    console.log(req.body);
    let repository = new FrontpageRepository();
    repository.addArticle(req.body)
        .then(articleId => res.send({ "articleId": articleId }))
        .catch(res.status(500));
});

app.post('/frontpage/file', (req, res) => {
    var path = '';
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured");
        }
        // No error occured.
        path = req.file.path;
        console.log(path);
        return res.send({ "filepath": path });
    });     
});

app.delete('/frontpage/:id', (req, res) => {
    let repository = new FrontpageRepository();
    repository.deletArticle(req.params.id)
        .then(status => res.send({ "result": status }));
});

app.set('port', 1234);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
