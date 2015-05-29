var session = require('express-session');

exports.createSession = function(request, response, user) {
  console.log('createSession');
  return request.session.regenerate(function(err) {
    if (err) {
      console.log('error in creating a session', err);
      throw err;
    }
    request.session.user = user;
    console.log('created that session, redirect to home');
    response.status(201).send(user);
  });
};

exports.getUserInfo = function(request, response) {
  // If the user doesn't request any specific info that they need,
  // we'll just send them some the default information that's
  // specified in defaultNeededInfo (i.e. their username)
  var defaultNeededInfo = ['username'];
  var neededUserInfo = request.body.neededUserInfo || defaultNeededInfo;
  console.log('session username', request.session.user.username);

  var userInfo = {};
  for (var i = 0; i < neededUserInfo.length; i++) {
    var infoName = neededUserInfo[i];
    userInfo[infoName] = request.session.user[infoName];
  }

  response.send(userInfo);
};

exports.stub = function (req,res) {
  console.log('stub', req.url);
  res.status(204).send();
};
