var url = require('url');
var Question = require('./models/question');
var User = require('./models/user');
var utils = require('./utilities');

exports.stub = function (req,res) {
  console.log('stub', req.url);
  res.status(204).send();
};

exports.addQuestion = function (req, res) {
	var info = req.body;
  console.log('addQuestion ',info)
	var newQuestion = new Question({
       video: info.video ,
       username: info.username,
       time: info.time,
       text: info.text,
       title: info.title,
       votes : 0,
       answers : []
	});
	newQuestion.save(function (err) {
	    if(err) {
        console.log('error in saving question', err);
        res.status(500).send('error in saving new question');
      }
      else {
        console.log('added question');
        res.status(201).send({msg : 'you posted to the database'});
      }
	});

};

exports.addAnswer = function(req, res) {
  var info = req.body;
  console.log('adding answer ', info);
  var answer = { text : info.text, votes : 0};
  Question.update({_id : info._id}, {'$push':{'answers': answer}}, function (err, data){
    if (!err) {
      res.status(202).send({msg : 'answered'});
    } else {
      res.status(500).send({msg : 'error while inserting into db'});
    }
  });    
  
}

exports.getQuestions = function (req, res) {
	console.log('getQuestions', req.url);
	var video = req.query.video;
	Question.find({video : video}, function (err, questions){
		if (!err)
			res.status(200).send({result : questions});
		else {
			console.log(err);
			res.status(500).send('Error fetching questions');
		}
	});

};

exports.getListings = function(req, res) {
  console.log('getListings', req.url);
  utils.checkUser(req,res, function() {
      var query = url.parse(req.url).query;
      var date = req.query.date;
      var loc = req.query.loc;
      //query db for all items listed
      Item.find({}, function(err, items) {
          if(!err) {
            var resultItems = items.filter(function(item) {
              if (date && item.dateFrom && item.dateTo) {
                if (!utils.checkDateRange(item.dateFrom,item.dateTo,date)) return false;
              }
              if (loc && item.address.indexOf(loc) < 0) return false;
              if(!item.calendar) {
                return true;
              }
              return !item.calendar.hasOwnProperty(date);
            });
            for (var i = 0 ; i < resultItems.length; i++)
              resultItems[i].date = date;
            console.log(resultItems);
            console.log('sending items back! ',resultItems.length);
            res.status(200).send({results: resultItems});
          }
          else {
              console.log('error in retrieving listings', err);
              res.status(500).send({errorMessage: 'error in retrieving listings'});
          }
      })
  });
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

exports.login = function(req, res) {
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