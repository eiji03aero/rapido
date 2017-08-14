var collection = require('../mongo'),
    ObjectID = require('mongodb').ObjectID,
    COL = 'todoLists',
    todo,
    assert = require('assert');

exports.index = function(req, res) {
  collection(COL).find({}).toArray(function(err, result) {
    res.render('todoLists/index', {todoLists: result});
  });
};

exports.create = function(req, res) {
  // todo = {
  //   todo: req.body.todo,
  //   description: req.body.description
  // };
  collection(COL).insertOne(
    {todo: req.body.todo,description: req.body.description},
    function(err, result) {
      assert.equal(err, null);
      res.redirect('/');
    }
  );
};

exports.update = function(req, res) {
  collection(COL).findOneAndUpdate(
    {_id: new ObjectID(req.body.id)},
    {$set:{
      'todo': req.body.todo,
      'description': req.body.description
    }},
    // {upsert: true},
    function(err, result) {
      assert.equal(err, null);
      res.send(result);
    }
  )
};

exports.destroy = function(req, res) {
  collection(COL).deleteOne(
    {_id: new ObjectID(req.body.id)},
    function(err, result) {
      res.redirect('/');
    }
  )
}
