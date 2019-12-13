const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');

// routes
router.post('/authenticate', authenticate);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', postUser);
module.exports = router;


function authenticate(req, res, next) {
    console.log('login from backend!');
    console.log(req.body);
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getUsers(req, res, next) {
    userService.getUsers().then(users => res.send(users))
        .catch(err => console.log(err));
}

function getUserById(req, res, next) {
    userService.getUser(req.params.id)
        .then(user => res.send(user))
        .catch(err => console.log(err));
}

function postUser(req, res, next) {
    console.log("called!!");
    console.log(req.body);
    userService.addUser(req.body)
        .then(userId => res.send({ "userId": userId }))
        .catch(err => next(err));
}
