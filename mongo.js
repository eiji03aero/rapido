const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/rapido';
let db;

// Use connect method to connect to the Server
MongoClient.connect(url, (err, mongodb) => {
  assert.equal(null, err);
  console.log('Connected correctly to server');
  db = mongodb;
});

const collection = (name) => { return db.collection(name); };

module.exports = collection;
