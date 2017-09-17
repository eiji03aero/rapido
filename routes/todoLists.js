require('date-utils');

const express = require('express');
const collection = require('../mongo');
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const router = express.Router();
const COL = 'todoLists';
const dt = new Date();
const fdt = dt.toFormat('YYYY/MM/DD HH24:MI');

const dummy = 'dummy';

router.get('/', (req, res) => {
  const todos = [];
  let categories;
  collection(COL).findOne(
    { docType: 'categoryTable' },
    { categories: 1 },
    (err, result) => {
      categories = result.categories;
      for (let i = 0; i < categories.length; i += 1) {
        todos.push([]);
      }
      collection(COL).find({ docType: 'todo' }).toArray((err2, result2) => {
        result2.forEach((val, idx, array) => {
          for (let i = 0; i < categories.length; i += 1) {
            if (categories[i] === val.categoryName) {
              todos[i].push(val);
            }
          }
        });
        res.render('todoLists/index', {
          todos,
          categories,
        });
      });
    },
  );
});

router.post('/create', (req, res) => {
  collection(COL).insertOne({
    docType: 'todo',
    categoryName: req.body.categoryName,
    title: req.body.title,
    contents: [{
      description: req.body.description,
      status: dummy,
      createdAt: fdt,
      dueTime: dummy,
    }],
    email: dummy,
    slack: dummy,
  }, (err, result) => {
    assert.equal(err, null);
    res.redirect('/todoLists');
  });
});

// TODO ↓作り直す。setの内容が変わっているはず
router.put('/:id', (req, res) => {
  collection(COL).findOneAndUpdate({
    _id: new ObjectID(req.body.id),
  }, {
    $set: {
      todo: req.body.todo,
      description: req.body.description,
      category: req.body.category,
    },
  }, {
    upsert: true,
  }, (err, result) => {
    res.redirect('/todoLists');
  });
});

router.delete('/:id', (req, res) => {
  collection(COL).deleteOne({
    _id: new ObjectID(req.body.id),
  }, (err, result) => {
    res.redirect('/todoLists');
  });
});

module.exports = router;
