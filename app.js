var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var config = require('./config/config');
var checksum = require('./model/checksum');
var http = require('http');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', cons.swig);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

// Events
app.get('/casestudy', function(req, res) {
  res.render('casestudy');
});

app.get('/mcchallenge', function(req, res) {
  res.render('mcchallenge');
});

app.get('/onlinetest', function(req, res) {
  res.render('onlinetest');
});

app.get('/design', function(req, res) {
  res.render('design');
});

app.get('/waterrocket', function(req, res) {
  res.render('waterrocket');
});

app.get('/analytics', function(req, res) {
  res.render('analytics');
});

// Workshops
app.get('/ansys', function(req, res) {
  res.render('ansys');
});

app.get('/creo', function(req, res) {
  res.render('creo');
});

app.get('/icengines', function(req, res) {
  res.render('icengines');
});

app.get('/rworkshop', function(req, res) {
  res.render('rworkshop');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.set('port', process.env.PORT || 3333);

http.createServer(app).listen(app.get('port'),
  function(){
    console.log("Express server listening on port " + app.get('port'));
});
