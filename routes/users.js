var express = require('express');
var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');
// gestion des routes (gestion de l'url') ici on recoit 'http://localhost:3000/users/new'
// on fait du découpage /users/new
// puis on traite /new

// REGISTER
router.post('/register', function(req, res, next) {
  	new User({
  		firstname: req.body.firstname,
  		lastname: req.body.lastname,
  		mail: req.body.mail,
  		password: crypto.createHmac('sha1', '56t83s*68_htn8rbiph')
				.update(req.body.password).digest('hex')
  	}).save(function(err, user) {
  		if (err) {
  			res.json("Les informations n'ont pas été enregistrés");
				res.json(err);
  		}
  		res.json(user)
  	});
});

router.get('/new', function(req, res, next) {
  	new User({
  		firstname: "Jean",
  		lastname: "Burellier",
  		mail: "aa@bb.cc"
  	}).save();

  res.send('create user');
});

router.get('/all', function(req, res, next) {
  User.find({}, function(err, users) {
  		if(err) throw err;
  		res.json(users);
  });
});

router.get('/one', function(req, res, next) {
  User.find({firstname: "Jean"}, function(err, users) {
  		if(err) throw err;
  		res.json(users);
  });
});

router.post('/newPOST', function(req, res, next) {
  	new User({
  		firstname: req.body.firstname,
  		lastname: req.body.lastname,
  		mail: req.body.mail
  	}).save();

  res.send('create POST user');
});

// http://localhost:3000/users/newGET
//?firstname=Bob&lastname=Dylan&mail=bd@gmail.com
router.get('/newGET', function(req, res, next) {
	console.log("query" + req.query.firstname);
  	new User({
  		firstname: req.query.firstname,
  		lastname: req.query.lastname,
  		mail: req.query.mail
  	}).save();

  res.send('create GET user');
});

module.exports = router;