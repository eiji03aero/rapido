
// variables
const express = require('express');
// const partials = require('express-partials');
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const assert = require('assert'),
// controller
const todoLists = require('./routes/todoLists');

const app = express();

// view settings
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

// favicon
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

// middlewares
app.use(express.static(path.join(__dirname, '/public/assets')));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// routings
app.get('/', (req, res) => { res.render('welcome/welcome'); });
app.use('/todoLists', todoLists);

// app settings
// for express-partials
// app.use(function(req, res, next) {
//   app.locals.resources = res.locals.resources || [];
//   next();
// });

// error handling
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('something went wrong...');
});

// server
app.listen(3000);

// TODO タブのデザイン変更
// TODO add-todoのタブ内の右のほうにdoneの奴を表示するボタンの機能の実装
// TODO cssのリファクタリング。height/widthやpaddingなど、一括で管理するようにする
// TODO ポチッと押したら、mongodbの中身を表示するterminal的モーダルを作る。ajaxで
// TODO bourbonを使ってみる
// TODO 今、todoListsのindexアクションが無理やり同期処理にコールバック地獄でしてあるので書き直す。promise?
// TODO ローディングのアニメーションをcssで作る
// TODO doneにする機能を作る
// TODO jquery uiを活用する
// TODO 看板を全体クリックにする
// TODO todoLists-fieldの高さ自動調節をそのうちやる。今は70%で適当にやってる
// TODO テストの実装
// TODO todoLists.jsリファクタリング。関数的に処理できるようにする
