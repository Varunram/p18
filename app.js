var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var config = require('./config/config');
var checksum = require('./model/checksum');

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

app.get('/events', function(req, res) {
  res.render('events');
});

app.get('/pgredirect', function(req, res) {
  res.render('pgredirect.ejs');
});

app.get('/testtxn', function(req, res) {
  res.render('testtxn.ejs', {
    'config': config
  });
});

app.post('/testtxn', function(req, res) {

  if (config.PAYTM_ENVIRONMENT == 'TEST') {
    PAYTM_FINAL_URL = 'https://securegw-stage.paytm.in/theia/processTransaction';
  } else {
    PAYTM_FINAL_URL = 'https://securegw.paytm.in/theia/processTransaction';
  }

  var paramlist = req.body;
  var paramarray = new Array();
  for (name in paramlist) {
    paramarray[name] = paramlist[name];
  }
  paramarray['PAYTM_STAG_URL'] = 'https://pguat.paytm.com';
  paramarray['PAYTM_PROD_URL'] = 'https://secure.paytm.in';
  paramarray['MID'] = 'Prodig41061704221412';
  paramarray['PAYTM_ENVIRONMENT'] = 'TEST'; // PROD FOR PRODUCTION
  paramarray['PAYTM_MERCHANT_KEY'] = '1Q&WSwIn8C2eGTSk';
  paramarray['WEBSITE'] = 'prodigy.nitt.edu';
  paramarray['CHANNEL_ID'] = 'WEB';
  paramarray['INDUSTRY_TYPE_ID'] = 'Retail';
  paramarray['PAYTM_FINAL_URL'] = 'https://securegw.paytm.in/theia/processTransaction';

  var PAYTM_MERCHANT_KEY = config.PAYTM_MERCHANT_KEY;
  paramarray['CALLBACK_URL'] = 'http://localhost:3000/response'; // in case if you want to send callback
  checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function(err, result) {
    res.render('pgredirect.ejs', {
      'restdata': result
    });
  });
});

app.post('/response', function(req, res) {
  console.log("in response post");
  var paramlist = req.body;
  var paramarray = new Array();
  console.log(paramlist);
  if (checksum.verifychecksum(paramlist, config.PAYTM_MERCHANT_KEY)) {
    console.log("true");
    res.render('response.ejs', {
      'restdata': "true",
      'paramlist': paramlist
    });
  } else {
    console.log("false");
    res.render('response.ejs', {
      'restdata': "false",
      'paramlist': paramlist
    });
  };
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
