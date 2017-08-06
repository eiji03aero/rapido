//variables
var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/rapido',
    assert = require('assert'),

    //controller
    todoLists = require('./routes/todoLists');


//settings
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//middlewares
app.use(express.static(__dirname + '/views/assets'));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));


//routings
app.get('/', todoLists.index);
app.get('/todoLists/new', todoLists.new);
app.post('/todoLists/create', todoLists.create);
app.get('/todoLists/:id/edit', todoLists.edit);
app.put('/todoLists/:id', todoLists.update);
app.delete('/todoLists/:id', todoLists.destroy);

app.get('/mongodbTest', mongodbTest.index);


//server
app.listen(3000);
