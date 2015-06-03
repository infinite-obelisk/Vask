var url = require('url');
var Course = require('../models/course');

exports.getCourses = function (req, res) {
	var author = req.query.author;
  var searchObj = {};
  if (author) searchObj.author = author;
  Course.find(searchObj, function(err, contents) {
    if (!err) {
      res.status(200).send({result: contents}); 
    } else {
      console.log(err);
      res.status(500).send({msg: 'Error fetching content'});
    }
  })
}

exports.addCourse = function (req, res) {
  var info = req.body;
  console.log('addCourse ',info);
  var newLecture = new Content(info);
  newLecture.save(function (err) {
    if (err) {
      console.log('error in saving course ',err);
      res.status(500).send({msg :'error in saving course to the database'});

    } else {
      console.log('added course');
      res.status(201).send({msg : 'you posted a course to the db'});
    }
  })
}