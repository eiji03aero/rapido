//variables
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  assert = require('assert'),

  //controller
  todoLists = require('./routes/todoLists'),

  app = express();

//view settings
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//middlewares
app.use(express.static(__dirname + '/views/assets'));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//routings
app.get('/', todoLists.index);
app.post('/todoLists/create', todoLists.create);
app.put('/todoLists/:id', todoLists.update);
app.delete('/todoLists/:id', todoLists.destroy);

//error handling
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('something went wrong...');
});

//server
app.listen(3000);

// TODO routerを書き直す。generator仕様
// TODO ローディングのアニメーションをcssで作る
// TODO タグ付けをできるようにする
// TODO 看板を全体クリックにする
// TODO 時刻表示が今のところ、開くたびにappendしてしまっている。
