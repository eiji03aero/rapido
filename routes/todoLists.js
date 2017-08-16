require('date-utils');

var express = require('express'),
  router = express.Router(),
  collection = require('../mongo'),
  ObjectID = require('mongodb').ObjectID,
  COL = 'todoLists',
  todo,
  dt = new Date(),
  fdt = dt.toFormat('YYYY/MM/DD HH24:MI'),
  assert = require('assert');

router.get('/', function(req, res) {
  collection(COL).find({}).toArray(function(err, result) {
    res.render('todoLists/index', {todoLists: result});
  });
});

router.post('/create', function(req, res) {
  collection(COL).insertOne({
    todo: req.body.todo,
    description: req.body.description,
    createdAt: fdt
  }, function(err, result) {
    assert.equal(err, null);
    console.log('inserted a document properly');
    res.redirect('/todoLists');
  });
});

router.put('/:id', function(req, res) {
  collection(COL).findOneAndUpdate({
    _id: new ObjectID(req.body.id)
  }, {
    $set: {
      todo: req.body.todo,
      description: req.body.description
    }
  }, {
    upsert: false
  }, function(err, result) {
    res.redirect('/todoLists');
  })
});

router.delete('/:id', function(req, res) {
  collection(COL).deleteOne({
    _id: new ObjectID(req.body.id)
  }, function(err, result) {
    res.redirect('/todoLists');
  })
});

module.exports = router;
