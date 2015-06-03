var React = require('react');

var ProfilePicture = React.createClass({
  //a sample image url: https://secure.gravatar.com/avatar/?s=100&r=g&d=mm
  render: function(){
    return (<a
              className="media-right profile-picture-container"
              href="#">
                <img
                  className="profile-picture"
                  src={this.props.imgUrl}
                  alt="icon" />
            </a>);
  }
});

module.exports = ProfilePicture;