var todoLists = [
  {todo: 'todo1', description: 'こんな感じ〜'},
  {todo: 'todo2', description: 'いい感じかな？'},
  {todo: 'todo3', description: 'これは最後'},
];
var collection = require('../mongo'),
    COL = 'users',
    assert = require('assert');

exports.index = function(req, res) {
  collection(COL).find({}).toArray(function(err, items) {
    res.render('todoLists/index', {todoLists: items});
  });
};

exports.new = function(req, res) {
  res.render('todoLists/new')
};

exports.create = function(req, res) {
  let todo = {
    todo: req.body.todo,
    description: req.body.description
  };
  collection(COL).insertOne(todo, function(err, result) {
    assert.equal(err, null);
    console.log('inserted a document properly');
    res.redirect('/');
  });
};

exports.edit = function(req, res) {
  res.render('todoLists/edit', {todoE: todoLists[req.params.id], id: req.params.id});
};

exports.update = function(req, res) {
  todoLists[req.params.id] = {
    todo: req.body.todo,
    description: req.body.description
  };
  res.redirect('/');
}

exports.destroy = function(req, res) {
  todoLists.splice(req.body.id, 1);
  res.redirect('/');
}
