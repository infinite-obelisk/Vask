var React = require('react');

var AnswerEntry = React.createClass({
  render: function(){
    return (<div
              className="col-lg-11 col-md-11 col-sm-11 col-xs-11 answer-text"
              style={{"paddingTop": "25px"}}>
                <a
                  href="#">
                    <h4
                      className="media-heading user-name">
                        {this.props.user} replies:
                    </h4>
                </a>
                {this.props.answer}
                <p>
                  <small>
                    <span
                      className="answer-time">
                        {this.props.answerTime}
                    </span>
                  </small>
                </p>
            </div>);
  }
});

module.exports = AnswerEntry;