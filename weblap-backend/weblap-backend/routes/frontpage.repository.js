const mongo = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:Abcd1234@cluster0-t99vz.mongodb.net/test?retryWrites=true&w=majority';
const uuid = require('uuid').v1;

class FrontpageRepository {

    async getFrontpageArticles() {
        const client = await this.getClient();
        let collection = this.getCollection(client);
        let result = await collection.find().sort({ _id: -1 });
        let resultAsArray = await result.toArray();
        return resultAsArray;
    }

    async addArticle(article) {
        const client = await this.getClient();
        let collection = this.getCollection(client);

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

    async deletArticle(articleId) {
        const client = await this.getClient();
        let collection = this.getCollection(client);
        await collection.deleteOne({ "newArticle.id": articleId });
        console.log(`article deleted ${articleId}`);
        return `article deleted ${articleId}`;
    }

    async getClient() {
        console.log(url);
        return await mongo.connect(url).catch((err) => console.log(err));
    }

    getCollection(client) {
        const db = client.db('weblap-db');
        let collection = db.collection('frontpage');
        return collection;
    }
}

module.exports = FrontpageRepository; 