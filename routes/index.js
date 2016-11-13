var express = require('express');
var router = express.Router();
var model = require('../model');
var User = model.User;


// デフォルトルーティング
router.get('/', function (request, response) {
    response.render('index', { title: 'CLICLI', message: 'Hello there!' });
});

router.get('/api', function(req, res) {
  // インスタンス作成
     var u = new User();
     // データセット
     u.userName = 'test01';
     u.pass = 'pass01';
     u.postNumber = '5300005';
     u.favorite = ['idxxxxxx','idyyyyyy','idzzzzzz'];

     // 保存　
     u.save();
     console.log("test-user-content");
     // 読み出し & ブラウザへデータ送信
     User.find({}, function(err, items){
       // find()の結果をブラウザに出力
       res.send(JSON.stringify(items));
     });
 });


 router.get( '/test/:id', function ( req, res ) {
   console.log(req.params.id);
 } );

 router.get( '/test/:id', function ( req, res ) {
   console.log(req.params.id);
 } );


module.exports = router;
