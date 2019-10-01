const express = require('express');
const router = express.Router();
var multer = require('multer');
const frontpageService = require('./frontpage.service');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');

// routes
router.get('/', getArticle);
router.post('/authenticate', authenticate);
router.post('/', postArticle);
router.put('/', updateArticle);
router.post('/file', postArticleImage);
router.delete('/:id', deleteArticle);
module.exports = router;

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

function authenticate(req, res, next) {
    console.log('login from backend!');
    frontpageService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getArticle(req, res, next) {
    frontpageService.getFrontpageArticles().then(articles => res.send(articles))
        .catch(err => console.log(err));
}

function updateArticle(req, res, next) {
    frontpageService.updateArticle(req.body)
        .then(status => res.send({ "result": status }))
        .catch(err => next(err));
}

function postArticle(req, res, next) {
    console.log(req.body);
    frontpageService.addArticle(req.body)
        .then(articleId => res.send({ "articleId": articleId }))
        .catch(err => next(err));
}

function postArticleImage(req, res, next) {
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
}

function deleteArticle(req, res, next) {
    frontpageService.deletArticle(req.params.id)
        .then(status => res.send({ "result": status }))
        .catch(err => next(err));
}