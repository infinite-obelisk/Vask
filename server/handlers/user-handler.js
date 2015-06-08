var url = require('url');
var User = require('./../models/user');
var utils = require('./../utilities');

exports.isLoggedIn = function(request) {
  console.log('isLoggedIn ',request.session.user)
  if(request.session) {
    return !!request.session.user;
  }
  return false;
};

exports.checkUser =  function(request, response, next) {
  console.log('checking user');
  if (!exports.isLoggedIn(request)) {
    if (request.url.toLowerCase() !== '/login') {
      console.log('not logged in! redirect');
      response.redirect('/login');
    } else {
      response.redirect('/testvideo');
    }
  } else {
    console.log('check user callback time! (user/sess valid!)')
    next();
  }
};

exports.signUpUser = function(req, res) {
  console.log('signUpUser', req.body.username);
  var info = req.body;
  User.findOne({ username : info.username }, function(err, user) {
    if(err) {
      console.log('error in checking database in sign up', err);
      res.status(500).send({errorMessage: 'error in searching database upon signup'});
    }
    else if( ! user ) {
      console.log('making new user ' + info.username + ' ' + info.password);
      var newUser = new User({
        username : info.username,
        password : info.password
      });

      newUser.save(function(err, newUser) {
        if(err) {
          console.log('error in saving new user information to db');
          res.status(500).send({errorMessage: 'error in saving user info to Database'});
        } 
        else {
          console.log('logging in user ' + info.username);
          res.status(302).send("Login");
        }
      });
    }
    else {
      console.log('username is already taken!', user);
      res.status(302).send('Sign Up');
    }
  });
};

exports.login = function(req, res, next) {
  console.log('login', req.url)
  var info = req.body;
  User.findOne({username: info.username}, function(err, user) {
    if(err) {
      console.log('server issue in db query for login');
      res.status(500).send({errorMessage: 'error in search of db upon login'});
    } 
    else if(user) {
      console.log('user ' + user);
      User.comparePassword(info.password, user.password, function(err, match) {
        if(err) {
          console.log('error in comparison!', err);
          res.status(500).send({errorMessage:'error in comparison of password'});
        }
        else {
          if(match) {
            utils.createSession(req,res,user);
            console.log('successful login!');
          } 
          else {
            console.log('password fail!');
            res.status(302).send('Login');
          }
        }
      });
    }
    else {
      console.log('username does not exist')
      res.status(302).send('Login');
    }
  });
};