var db;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/users';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db = mongodb.collection('users');
  db.find({}).toArray(function(err, items) {
    assert.equal(null, err);
    users = items;
    mongodb.close();
  });
});

var collection = function( name ) {
  return db.collection( name );
}

module.exports = collection;
