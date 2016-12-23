var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var userdetail = require('./routes/userdetail');
//var game1 = require('./routes/game1');
//var game2 = require('./routes/game2');
//var introduction = require('./routes/introduction');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

global.MySQL = mysql.createPool({
	connectionLimit : 10,
	//host : '140.119.113.150',
	host : 'localhost',
	user : 'root',
	password : '1234',
	database : 'nccuGame'
});



app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/userdetail', userdetail);
app.use('/index', index);
//app.use('/game1', game1);
//app.use('/game2', game2);
//app.use('/introduction', introduction);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
