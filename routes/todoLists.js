require('date-utils');

var express = require('express'),
  router = express.Router(),
  collection = require('../mongo'),
  ObjectID = require('mongodb').ObjectID,
  COL = 'todoLists',
  dt = new Date(),
  fdt = dt.toFormat('YYYY/MM/DD HH24:MI'),
  categories = ['due today', 'have bullet', 'waited bullet', 'other bullet', 'done soldier'];

  assert = require('assert');

router.get('/', function(req, res) {
  let due =[],
      have = [],
      waited = [],
      other = [],
      done = [];
  collection(COL).find({}).toArray(function(err, result) {
    result.forEach(function(val, idx, array) {
      switch (val.category){
        case categories[0]:
          due.push(val);
          break;
        case categories[1]:
          have.push(val);
          break;
        case categories[2]:
          waited.push(val);
          break;
        case categories[3]:
          other.push(val);
          break;
        case categories[4]:
          done.push(val);
          break;
      }
    });
    res.render('todoLists/index', {
      due: due,
      have: have,
      waited: waited,
      other: other,
      done: done
    });
  });
});

router.post('/create', function(req, res) {
  collection(COL).insertOne({
    dct: 'todo',
    todo: req.body.todo,
    description: req.body.description,
    category: req.body.category,
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
      description: req.body.description,
      category: req.body.category
    }
  }, {
    upsert: true
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

// categoryをまとめるdocument:
// {dct: 'categoryTable', categories: ['due today', 'have bullet', 'waited bullet', 'other bullet', 'done soldier']}

module.exports = router;
