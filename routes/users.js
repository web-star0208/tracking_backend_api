var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* SAVE USER */
router.post('/', function(req, res, next) {
  if (User.find({ "email": req.email}).count()) {
    res.json({
      success: false,
      errorMessage: "Same email is already registered."
    });
  } else {
    User.create(req.body, function (err, user) {
      if (err) return next(err);
      res.json({
        success: true
      });
    });
  }
});

/* LOGIN USER */
router.post('/login', function(req, res, next) {
  var user = User.find({ "email": req.email});
  if (User.find({ "email": req.email})) {
    if (user.password == req.password) {
      res.json({
        password: user.password,
        success: true
      });
    } else {
      res.json({
        success: false,
        errorMessage: "password is incorrect."
      });
    }
  } else {
    res.json({
      success: false,
      errorMessage: "email is not registered"
    });
  }
});
/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

module.exports = router;
