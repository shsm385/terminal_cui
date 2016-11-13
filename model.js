var mongoose = require('mongoose');
var url = 'mongodb://ec2-52-192-48-132.ap-northeast-1.compute.amazonaws.com:/sampledb';
var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

// Modelの定義
var UserSchema = new mongoose.Schema({
    userName    : String,
    pass  : String,
    postNumber: String,
    favorite: [String]
},{collection: 'samplecol'});

exports.User = db.model('User', UserSchema);
