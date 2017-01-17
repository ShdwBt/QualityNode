var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var User = new Schema({
    firstname : String,
    lastname : String,
    mail : {type: String, index : {unique: true}}, // gestion de l'unicité du mail en base
    password : String

});

module.exports = mongoose.model('User' , User);