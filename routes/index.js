var express = require('express');
var router = express.Router();

// デフォルトルーティング
router.get('/', function (request, response) {
    response.render('index', { title: 'CLICLI', message: 'Hello there!' });
});

module.exports = router;
