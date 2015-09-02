var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dashit');
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'mongodb connection error:'));
