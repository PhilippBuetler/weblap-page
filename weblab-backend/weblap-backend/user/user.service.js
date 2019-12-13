// WTF why does it not work?!
//const config = require('../config.json');
const mySecret = "Some fancy token to sign and verify jwt tokens";
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:Abcd1234@cluster0-t99vz.mongodb.net/test?retryWrites=true&w=majority';
const uuid = require('uuid').v1;

module.exports = {
    authenticate,
    addUser,
    getUser,
    getUsers
};

async function authenticate({ username, password }) {
    const client = await getClient();
    let collection = getCollection(client);
    let result = await collection.find().sort({ _id: -1 });
    let resultAsArray = await result.toArray();
    resultAsArray.forEach(element => console.log(element.newUser.email));
    let user = await resultAsArray.find(u => u.newUser.email === username && u.newUser.password === password);
    var u = user.newUser;
    user = { id: u.id, prename: u.prename, lastname: u.lastname, email: u.email, password: u.password, token: u.token, walletId: u.walletId, walletPassword: u.walletPassword, role: u.role };
    console.log(user);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, mySecret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getUsers() {
    const client = await getClient();
    let collection = getCollection(client);
    let result = await collection.find().sort({ _id: -1 });
    let resultAsArray = await result.toArray();
    return resultAsArray;
}

async function getUser(userId) {
    const client = await getClient();
    let collection = getCollection(client);
    let result = await collection.find(u => u.userId === userId);
    console.log(`user returned ${result.email}`);
    return result;
}

async function addUser(user) {
    const client = await getClient();
    let collection = getCollection(client);

    console.log(user);

    if (!client) {
        return null;
    }

    let userId = uuid();

    let newUser = {
        id: userId,
        prename: user.prename,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        token: user.token,
        walletId: user.walletId,
        walletPassword: user.walletPassword,
        role: Role.User
    };
    await collection.insertOne({ newUser }, function (error, response) {
        if (error) {
            console.log('Error occurred while inserting');
            return null;
        } else {
            console.log('inserted user', response.ops[0]);
        }
    });

    return newUser.id;
}

async function getClient() {
    console.log(url);
    return await mongo.connect(url).catch((err) => console.log(err));
}

function getCollection(client) {
    const db = client.db('weblap-db');
    let collection = db.collection('user');
    return collection;
}

