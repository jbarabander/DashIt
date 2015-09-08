var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var sass = require('node-sass-middleware');
var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('./models/index.js');

var app = express();

app.use(require('./routes/logging.middleware.js'));
app.use(require('./routes/requestState.middleware.js'));
app.use(require('./routes/sass.middleware.js'));
app.use('/auth', require('./routes/auth.router.js'));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var indexHtmlPath = path.join(__dirname, '/views/index.html');

var validFrontEndRoutes = ['/', '/signup', '/login', '/users', '/dashes', '/dashes/:type', 'dashes/:type/:id', 'dashes/:type/:id/progress', 'dashes/discrete/:dashid/progress/:stepid', '/users/:id'];
validFrontEndRoutes.forEach(function(stateRoute) {
  app.get(stateRoute, function(req,res,next) {
    res.sendFile(indexHtmlPath);
  });
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);
app.use('/users', users);

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
