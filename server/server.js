var db = require('./configMongoose');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../client'));

// This isn't necessary right now because express.static automatically
// searches for the index.html file in the specified directory that was 
// passed in as an argument.
// app.get('/', function(request, response) {
//   console.log('APP GET');
//   response.sendFile(__dirname + '/../client/index.html');
// });

var port = 8000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});
