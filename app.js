var express = require('express');

// express の実態 Application を生成
var app = express();

// テンプレートエンジンを EJS に設定
app.set('views', './views');
app.set('view engine', 'ejs');

// 静的ファイルは無条件に公開
app.use('/public', express.static('public'));

// ルーティング設定
app.use('/', require('./routes/index.js'));

//MongoDBのRESTfulAPI用のルーティング
app.use('/api', require('./routes/api.js'));

//CORS settings
//var cors = require('cors');
//app.use(cors());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
//    next();
});

// サーバーをポート 3000 で起動
app.listen(3000);
// アプリケーション開始ログ
console.log('Server running at http://localhost:3000');
