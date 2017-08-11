// var users = collection('users');

var db;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var users;

// Connection URL
var url = 'mongodb://localhost:27017/users';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db = mongodb;
  db.collection('users').find().toArray(function(err, items) {
    users = items;
  })
});


exports.index = function(req, res) {
  res.send(users);
}
