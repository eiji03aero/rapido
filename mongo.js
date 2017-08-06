var db,
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    url = 'mongodb://localhost:27017/data';

MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db = mongodb;
});

var collection = function( name ) {
  return db.collection( name );
};

module.exports = collection;
