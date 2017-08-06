var users = require('../mongo');

exports.index = function(req, res) {
  console.log(users.db);
  res.render('mongodbTest/index', {users: users});
}
