// 必要なパッケージの読み込み
var express = require('express');
var bodyParser = require('body-parser');
// DBへの接続
var mongoose = require('mongoose');
mongoose.connect('mongodb://ec2-52-192-48-132.ap-northeast-1.compute.amazonaws.com:/sampledb');

// モデルの宣言
var User = require('../model.js');
// expressでAPIサーバを使うための準備
var router = express.Router();

// POSTでdataを受け取るための記述
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 何か操作があったときにコンソールに出力する
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// /users というルートを作成する．
router.route('/users')
// ユーザの作成 (POST http://localhost:3000/api/users)
    .post(function(req, res) {
        // 新しいユーザのモデルを作成する．
        var user = new User();

        // ユーザの各カラムの情報を取得する．
        user.userName = req.body.userName;
        user.pass = req.body.pass;
        user.postNumber = req.body.postNumber;
        user.homeDirectory = req.body.homeDirectory;
        user.favorite = req.body.favorite;

        // ユーザ情報をセーブする．
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created!' });
        });
    })

// 全てのユーザ一覧を取得 (GET http://localhost:3000/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });


// /users/:userName というルートを作成する．
router.route('/users/:userName')
// userNameを指定して1人のユーザの情報を取得 (GET http://localhost:3000/api/users/:userName)
    .get(function(req, res) {
        //user_idが一致するデータを探す．
        User.find({userName: req.params.userName }, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
// userNameを指定して1人のユーザの情報を更新 (PUT http://localhost:3000/api/users/:userName)
    .put(function(req, res) {
        User.findOne({userName: req.params.userName }, function(err, user) {
            if (err)
                res.send(err);
            // ユーザの各カラムの情報を更新する．
            user.pass = req.body.pass;
            user.postNumber = req.body.postNumber;
            user.homeDirectory = req.body.homeDirectory;
            user.favorite = req.body.favorite;

            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User updated!' });
            });
        });
    })

// userNameを指定して1人のユーザの情報を削除 (DELETE http://localhost:3000/api/users/:userName)
    .delete(function(req, res) {
        User.remove({userName: req.params.userName}, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;
