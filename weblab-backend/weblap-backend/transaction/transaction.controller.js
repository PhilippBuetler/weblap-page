const express = require('express');
const router = express.Router();
const transactionService = require('./transaction.service');

// routes
router.get('/:id', getTransactionByUserId);
router.get('/', getTransactions);
router.post('/', postTransaction);
module.exports = router;

function postTransaction(req, res, next) {
    console.log(req.body);
    transactionService.addTransaction(req.body)
        .then(transactionId => res.send({ "transactionId": transactionId }))
        .catch(err => next(err));
}

function getTransactions(req, res, next) {
    transactionService.getTransaction().then(transactions => res.send(transactions))
        .catch(err => console.log(err));
}

function getTransactionByUserId(req, res, next) {
    transactionService.getTransactionById(req.params.id)
        .then(transaction => res.send(transaction))
        .catch(err => console.log(err));
}