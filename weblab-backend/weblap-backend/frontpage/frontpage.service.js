// WTF why does it not work?!
//const config = require('../config.json');
const mySecret = "Some fancy token to sign and verify jwt tokens";
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:Abcd1234@cluster0-t99vz.mongodb.net/test?retryWrites=true&w=majority';
const uuid = require('uuid').v1;

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User },
    { id: 3, username: 'spender', password: 'spender', firstName: 'Normal', lastName: 'Spender', role: Role.User }
];

module.exports = {
    authenticate,
    getFrontpageArticles,
    addArticle,
    deletArticle,
    updateArticle
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, mySecret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getFrontpageArticles() {
    const client = await getClient();
    let collection = getCollection(client);
    let result = await collection.find().sort({ _id: -1 });
    let resultAsArray = await result.toArray();
    return resultAsArray;
}

async function addArticle(article) {
    const client = await getClient();
    let collection = getCollection(client);

    console.log(article);

    if (!client) {
        return null;
    }

    let articleId = uuid();

    let newArticle = {
        id: articleId,
        date: new Date(),
        title: article.title,
        subtitle: article.subtitle,
        content: article.content,
        imagepath: article.imagepath
    };
    await collection.insertOne({ newArticle }, function (error, response) {
        if (error) {
            console.log('Error occurred while inserting');
            return null;
        } else {
            console.log('inserted record', response.ops[0]);
        }
    });

    return newArticle.id;
}

async function deletArticle(articleId) {
    const client = await getClient();
    let collection = getCollection(client);
    await collection.deleteOne({ "newArticle.id": articleId });
    console.log(`article deleted ${articleId}`);
    return `article deleted ${articleId}`;
}

async function updateArticle(article) {
    console.log(article);
    const client = await getClient();
    let collection = getCollection(client);
    var existingArticle = { "newArticle.id": article.id };
    var newvalues = {
        $set: {
            "newArticle.title": article.title, "newArticle.subtitle": article.subtitle, "newArticle.content": article.content, "newArticle.imagepath": article.imagepath
        }
    };
    //await collection.updateOne({ existingArticle, newvalues });
    await collection.updateOne(existingArticle, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
    return `article updated ${article.id}`;
}

async function getClient() {
    console.log(url);
    return await mongo.connect(url).catch((err) => console.log(err));
}

function getCollection(client) {
    const db = client.db('weblap-db');
    let collection = db.collection('frontpage');
    return collection;
}

