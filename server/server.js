var db = require('./configMongoose');
var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var multer  = require('multer');
var session = require('express-session');
var handlers = require('./request-handler');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.get('/favicon.ico', handlers.stub);

app.post('/addquestion', handlers.addQuestion);

app.get('/getquestions', handlers.getQuestions);

// This isn't necessary right now because express.static automatically
// searches for the index.html file in the specified directory that was 
// passed in as an argument.
// app.get('/', function(request, response) {
//   console.log('APP GET');
//   response.sendFile(__dirname + '/../client/index.html');
// });

var port = 3000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});
