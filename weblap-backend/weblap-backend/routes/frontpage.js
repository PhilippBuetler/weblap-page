let express = require('express');
let router = express.Router();

let FrontpageRepository = require('./frontpage.repository');

router.get('/', (req, res) => {
    let repository = new FrontpageRepository();

    repository.getFrontpageArticles().then(articles => res.send(articles))
        .catch(err => console.log(err));
});

router.post('/frontpage', (req, res) => {
    console.log(req.body);
    let repository = new FrontpageRepository();
    repository.addArticle(req.body)
        .then(articleDate => res.send({ articleDate: articleDate }))
        .catch(res.status(500));
});

module.exports = router;


