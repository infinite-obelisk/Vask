var url = require('url');
var Content = require('../models/content');
var searchEng = require('../search');

var fakeVideos = [
  {
  	_id: '1',
    url: "https://www.youtube.com/watch?v=Jh0er2pRcq8&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974",
    shortUrl: "Jh0er2pRcq8",
    title: "Explore MEAN Stack at 2015",
    subtitle: "Added 1 year ago",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo kdjkwe qwkdkmkmqd kqwdjkqwdkq oqwdkqdwqm qodpqwkdokq oqwkdow owd wow ow owkdowklwdm wokw w lmwdlwm owoowldmo."
  },  
  {
  	_id: '2',
    url: "https://www.youtube.com/watch?v=1RMWS60gGUY&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974&index=2",
    shortUrl: "1RMWS60gGUY",
    title: "Building high quality services at Uber with Node.js",
    subtitle: "Added 5 minutes ago",
    description: "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
  },
  {
  	_id: '3',
    url: "https://www.youtube.com/watch?v=WOVmr6CjgNw&index=3&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974",
    shortUrl: "WOVmr6CjgNw",
    title: "Comparing Node.js Frameworks: Express, Hapi, LoopBack, Sailsjs and Meteor",
    subtitle: "Added 2 years ago",
    description: "xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
  	_id: '4',
    url: "https://www.youtube.com/watch?v=FVdH9YcB3Dg&list=PLUPi8Qj7uZ3QpsamMg8NvqI9QWv3bK974&index=5",
    shortUrl: "FVdH9YcB3Dg",
    title: "Node.js Fundamentals",
    subtitle: "Added 3 weeks ago",
    description: " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
  },
];

var filterContents = function(contents, search, size) {
  size = size || 30;
  // if no search, just return top result, reversing to get latest content first
  if (!search) return contents.reverse().filter(function(c,idx){ return idx < size});
  contents.forEach(function(content) {
    var cArr = [];
    cArr.push({ weight : 1.4, words : content.course});
    cArr.push({ weight : 1.0, words : content.title});
    cArr.push({ weight : 0.6, words : content.description});
    content.rank = searchEng.search(search,cArr);
    //console.log(content.rank);
  });
  contents.sort(function(a,b){return b.rank-a.rank});
  return contents.filter(function(c,idx){ return idx < size});
}

exports.getLectures = function (req, res) {
	//res.status(200).send({result : fakeVideos});
  var search = req.query.search;
  var size = req.query.size;
  Content.find({}, function(err, contents) {
    if (!err) {
      if (contents.length) res.status(200).send({
        result: filterContents(contents,search,size)
      });
      else res.status(200).send({result: fakeVideos}); 
    } else {
      console.log(err);
      res.status(500).send({msg: 'Error fetching content'});
    }
  })
}

exports.addLecture = function (req, res) {
  var info = req.body;
  var urlParse = url.parse(info.url);
  var qs = urlParse.query.split('&');
  qs.forEach(function(q){
    if (q.length>2 && q[0]==='v' && q[1]==='=') info.shortUrl = q.slice(2);
  }),
  info.questionCount = 0;
  info.userCount = 0;
  console.log('addLecture ',info);
  var newLecture = new Content(info);
  newLecture.save(function (err) {
    if (err) {
      console.log('error in saving lecture ',err);
      res.status(500).send({msg :'error in saving lecture to the database'});

    } else {
      console.log('added lecture');
      res.status(201).send({msg : 'you posted a lecture to the db'});
    }
  })
}

exports.relatedLectures = function (req, res) {
  var video = req.query.video;
}