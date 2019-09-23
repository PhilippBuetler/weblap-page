var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/frontpage', frontpageRouter);

// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

 //production error handler
 //no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.post('/frontpage', (req, res) => {
    console.log(req.body);
    let repository = new FrontpageRepository();
    repository.addArticle(req.body)
        .then(articleId => res.send({ articleId: articleId }))
        .catch(res.status(500));
});

app.set('port', 1234);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
