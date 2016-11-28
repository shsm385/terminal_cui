var mongoose = require('mongoose');
var Schema       = mongoose.Schema;

// Modelの定義
var UserSchema = new Schema({
    userName      : { type: String, required: true, unique: true },
    pass          : { type: String, required: true},
    postNumber    : String,
    homeDirectory : String,
    favorite      : [String]
});

module.exports = mongoose.model('User', UserSchema);
