var React = require('react');

var QuestionEntry = React.createClass({
  render: function(){
    return (<div
              className="col-lg-10 col-md-10 col-sm-10 col-xs-10"
              style={{"paddingTop": "25px"}}>
                <a href="#">
                  <h4
                    className="media-heading user-name">
                      {this.props.user} asks:
                  </h4>
                </a>
                {this.props.question}
                <p>
                  <small>
                    <span
                      className="video-time">
                        Time: {this.props.videoTime}
                    </span>&nbsp;|&nbsp;
                    <span
                      className="question-time">
                         {this.props.questionTime}
                    </span>
                  </small>
                </p>
            </div>);
  }
});

module.exports = QuestionEntry;