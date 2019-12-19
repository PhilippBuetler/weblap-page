// WTF why does it not work?!
//const config = require('../config.json');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:Abcd1234@cluster0-t99vz.mongodb.net/test?retryWrites=true&w=majority';
const uuid = require('uuid').v1;

module.exports = {
    addTransaction,
    getTransactionById,
    getTransaction
};

async function addTransaction(transaction) {
    const client = await getClient();
    let collection = getCollection(client);

    console.log(transaction);

    if (!client) {
        return null;
    }

    let transactionId = uuid();

    let newTransaction = {
        id: transactionId,
        date: new Date().toLocaleString(),
        spenderId: transaction.spenderId,
        projectName: transaction.projectName,
        projectId : transaction.projectId,
        donation: transaction.donation
    };
    await collection.insertOne({ newTransaction }, function (error, response) {
        if (error) {
            console.log('Error occurred while inserting');
            return null;
        } else {
            console.log('inserted record', response.ops[0]);
        }
    });

    return newTransaction.id;
}

async function getTransactionById(spenderId) {
    const client = await getClient();
    let collection = getCollection(client);
    let result = await collection.find(u => u.spenderId === spenderId);
    let resultAsArray = await result.toArray();
    console.log(`transaction found`);
    return resultAsArray;
}

async function getTransaction() {
    const client = await getClient();
    let collection = getCollection(client);
    let result = await collection.find().sort({ _id: -1 });
    let resultAsArray = await result.toArray();
    return resultAsArray;
}

async function getClient() {
    console.log(url);
    return await mongo.connect(url).catch((err) => console.log(err));
}

function getCollection(client) {
    const db = client.db('weblap-db');
    let collection = db.collection('transaction');
    return collection;
}

