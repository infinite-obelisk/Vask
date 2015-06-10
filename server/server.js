var db = require('./configMongoose');
var express = require('express');
var path = require('path');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var multer  = require('multer');
var session = require('express-session');
var questionHandler = require('./handlers/question-handler');
var userHandler = require('./handlers/user-handler');
var contentHandler = require('./handlers/content-handler');
var courseHandler = require('./handlers/course-handler');
var util = require('./utilities');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'be very quiet its a secret, WOOO!'
  //resave: false, // session store needs touch method for this to be ok
  //saveUninitialized : false
  //cookie: { secure : true} // requires https
}));


app.use(bodyParser.urlencoded({extended:true}));

app.get('/', userHandler.checkUser,function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/views/main.html'));
});

app.use('/lecture/:id', function(req, res){
  //TODO: Use this ID to make sure that the video exists.
  var id = req.params.id;
  if(id){
    res.sendFile(path.resolve(__dirname + '/../client/views/lectureView.html'));
  } else {
    //HTTP code 400 indicates a bad request.
    res.redirect(400, '/');
  }
});

app.get('/favicon.ico', util.stub);

app.post('/addquestion', questionHandler.addQuestion);
app.post('/addlecture', contentHandler.addLecture);
app.post('/addanswer', questionHandler.addAnswer);
app.post('/votequestion', questionHandler.voteQuestion);
app.post('/voteanswer', questionHandler.voteAnswer);
app.get('/getquestions', questionHandler.getQuestions);
app.get('/getrelated', contentHandler.relatedLectures);
app.get('/getlectureinfo', contentHandler.getLectureInfo);
app.get('/getlectures', contentHandler.getLectures);
app.get('/getcourses', courseHandler.getCourses);

app.post('/signup', userHandler.signUpUser);
app.post('/login', userHandler.login);
app.get('/signup', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/pages/signup.html'));
});
app.get('/login', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/pages/login.html'));
});
app.get('/testvideo', userHandler.checkUser, function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/views/lectureView.html'));
});
app.get('/getUserInfo', util.getUserInfo);

// This isn't necessary right now because express.static automatically
// searches for the index.html file in the specified directory that was
// passed in as an argument.
// app.get('/', function(request, response) {
//   console.log('APP GET');
//   response.sendFile(__dirname + '/../client/index.html');
// });

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});

app.use(express.static(__dirname + '/../client'));
