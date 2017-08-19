//variables
var express = require('express'),
  partials = require('express-partials'),
  favicon = require('serve-favicon'),
  path = require('path'),
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

//favicon
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

//middlewares
app.use(express.static(__dirname + '/public/assets'));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//routings
app.get('/', function(req, res) {res.render('welcome/welcome')});
app.use('/todoLists', todoLists);

//app settings
//for express-partials
app.use(function(req, res, next) {
  app.locals.resources = res.locals.resources || [];
  next();
});

//error handling
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('something went wrong...');
});

//server
app.listen(3000);

// TODO 今、todoListsのindexアクションが無理やり同期処理にコールバック地獄でしてあるので書き直す。promise?
// TODO モーダルの縦を伸ばす
// TODO 一つのドキュメントに配列で保存するスタイルにする？
// TODO ローディングのアニメーションをcssで作る
// TODO doneにする機能を作る
// TODO 看板をドラッグ出来るようにする
// TODO jquery uiを活用する
// TODO タグ付けをできるようにする
// TODO 看板を全体クリックにする
// TODO express-partialsの導入。モーダルに使う。ajaxが必要？参考；http://hogesuke.hateblo.jp/entry/2014/04/07/010256
// TODO todoLists-fieldの高さ自動調節をそのうちやる。今は70%で適当にやってる
// TODO make some awesome animation
// TODO modal内をheader, body, footerの3つに分けて、それぞれ内容のみを書き換える。ボタンを共通にしてモーダルを開く関数を一つにまとめる。コールバックに描写の関数を渡すことによって一貫性を保つようにする
// TODO 編集のモーダルは右から出てくる感じに。参考：salesforce
// TODO テストの実装
// TODO todoLists.jsとindex.pugのレファクタリング。関数的に処理できるようにする
