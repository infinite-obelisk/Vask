var React = require('react');

var Playlist = React.createClass({
  render: function() {
    return (
      <div className="box-playlist">
        <div className="row">
          <div className="col-sm-4 pl pl-first">
            <img className="playlist-thumb" src="https://i3.ytimg.com/vi/t7eyMwlgOI0/mqdefault.jpg"/>
          </div>
          <div className="col-sm-7 pl">
            <div className="playlist-ct-title"><p>Lesson 1 - Introduction to Angular 2.0</p></div>
          </div>
          <div className="col-sm-1 pl">
            <div className="playlist-content-item-stats lct-played"></div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Playlist
;