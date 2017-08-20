require('date-utils');

var express = require('express'),
  router = express.Router(),
  collection = require('../mongo'),
  ObjectID = require('mongodb').ObjectID,
  COL = 'todoLists',
  dt = new Date(),
  fdt = dt.toFormat('YYYY/MM/DD HH24:MI'),

  assert = require('assert');

router.get('/', function(req, res) {
  let categories = [],
      todos = [];
  collection(COL).findOne(
    {docType: "categoryTable"},
    {categories: 1},
    function(err, result) {
      categories = result.categories;
      for (let i=0; i<categories.length; i++) {
        todos.push([]);
      }
      collection(COL).find({docType: "todo"}).toArray(function(err, result) {
        result.forEach(function(val, idx, array) {
          for (let i=0; i<categories.length; i++) {
            if (categories[i]==val.categoryName) {
              todos[i].push(val);
            }
          };
        });
        res.render('todoLists/index', {
          todos: todos,
          categories: categories
        });
      });
    }
  );
});

router.post('/create', function(req, res) {
  collection(COL).insertOne({
    docType: 'todo',
    categoryName: req.body.categoryName,
    title: req.body.title,
    contents: [{
      description: req.body.description,
      status: "dummy",
      createdAt: fdt,
      dueTime: "dummy",
    }],
    email: "dummy",
    slack: "dummy"
  }, function(err, result) {
    assert.equal(err, null);
    res.redirect('/todoLists');
  });
});

// TODO ↓作り直す。setの内容が変わっているはず
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
  });
});

module.exports = router;
