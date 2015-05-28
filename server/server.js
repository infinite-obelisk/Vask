var db = require('./configMongoose');
var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var multer  = require('multer');
var session = require('express-session');
var questionHandler = require('./handlers/question-handler');
var userHandler = require('./handlers/user-handler');
var contentHandler = require('./handlers/content-handler');
var util = require('./utilities');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.use(session({
  secret: 'be very quiet its a secret, WOOO!',
  resave: false, // session store needs touch method for this to be ok
  saveUninitialized : false
  //cookie: { secure : true} // requires https
}));

app.get('/favicon.ico', util.stub);

app.post('/addquestion', questionHandler.addQuestion);
app.post('/addanswer', questionHandler.addAnswer);
app.post('/votequestion', questionHandler.voteQuestion);
app.get('/getquestions', questionHandler.getQuestions);

app.get('/getlectures', contentHandler.getLectures);

app.post('/signup', userHandler.signUpUser);
app.post('/login', userHandler.login);

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
