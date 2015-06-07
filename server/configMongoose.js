var mongoose = require('mongoose');
var server = process.env.MONGOLAB_URI ? 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ds029811.mongolab.com:29811/heroku_app37591225' : 'mongodb://localhost/Vask'
mongoose.connect(server);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});


module.exports = db;