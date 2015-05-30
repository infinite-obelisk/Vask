var formatTime = function (objTime, dateTime) {
  if (!objTime) return 'before universe';
  var diff = Math.floor((dateTime - objTime) / 1000);
  if (diff < 60) return 'less than a minute ago';
  diff = Math.floor(diff/60);
  if (diff < 60) return diff + ' minutes ago';
  diff = Math.floor(diff/60);
  if (diff === 1) return '1 hour ago';
  if (diff < 24) return diff + ' hours ago';
  diff = Math.floor(diff/24);
  if (diff === 1) return 'yesterday';
  return diff + ' days ago';
}

var getVideoData = function(cb) {
  $.ajax({
          url: "/getquestions?video=test2",
          method: "GET",
          contentType: "application/json",
          statusCode: {
            200: function (data) {
              console.log('win');
              console.log(data);
              var qdata = [];
              window.qObject = {};
              window.videoData = qdata;
              var dateTime = new Date().getTime();
              data.result.forEach(function (item) {
                var answers = item.answers.map(function(answer){
                  answer.answerTime = formatTime(answer.createdAt, dateTime);
                  answer.questionId = item._id;
                  return answer;
                });
                var question = {
                  question : item.title,
                  questionId : item._id,
                  questionUrl : '#',
                  time: item.time,
                  votes : item.votes,
                  key : qdata.length + 1,
                  user: item.username || "Anonymous",
                  questionTime : formatTime(item.createdAt, dateTime),
                  answers : answers
                };
                qdata.push(question);
                window.qObject[item._id] = question;
              })
              cb();
            },
            500: function (err) {
              console.log('lose')
            }
          }
        });
}


var addQuestion = function() {
	var self = this;
    $.ajax({
          url: "/addquestion",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            video : 'test2',
            text : window.$('#question-text').val(),
            username : 'name',
            time : Math.floor(window.player.getCurrentTime()),
            title : window.$('#question-title').val()
          }),
          statusCode: {
            201: function (data) {
              console.log('win');
              console.log(data);
              self.clearForm();
              self.closeDialog();
            },
            500: function (err) {
              console.log('lose')
            }
          }
        });
}

var voteQuestion = function (questionId, inc, answerIndex) {
	var data = {
		inc : inc,
		_id : questionId
	};
	var url = '/votequestion';
	if (answerIndex!==undefined) {
		data.idx = answerIndex;
		url = '/voteanswer'
	}
	$.ajax({
          url: url,
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(data),
          statusCode: {
            201: function (data) {
              console.log('win');
              console.log(data);
              },
            500: function (err) {
              console.log('lose')
            }
          }
        });
}

var addAnswer = function (questionId, answerText) {
	$.ajax({
          url: "/addanswer",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            text : answerText,
            _id : questionId
          }),
          statusCode: {
            201: function (data) {
              console.log('win');
              console.log(data);
              //self.clearForm();
              //self.closeDialog();
            },
            500: function (err) {
              console.log('lose')
            }
          }
        });
}