var url = require('url');
var Question = require('./models/question');


exports.stub = function (req,res) {
  console.log('stub', req.url);
  res.status(204).send();
};

exports.addQuestion = function (req, res) {
	var info = req.body;
	var newQuestion = new Question({
       video: info.video ,
       username: info.username,
       time: info.time,
       text: info.text 
	});
	newQuestion.save(function (err) {
	    if(err) {
        console.log('error in saving question', err);
        res.status(500).send('error in saving new question');
      }
      else {
        console.log('added question');
        res.status(201).send('you posted to the database');
      }
	});

};

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