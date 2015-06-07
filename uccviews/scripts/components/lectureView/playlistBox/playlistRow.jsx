var React = require('react');

var PlaylistRow = React.createClass({

  render: function() {
    console.log('title', this.props.title);
    console.log('thumb', this.props.thumb);
    console.log('status', this.props.status);
    
    var status;
    // Define the CSS class to be injected
    switch (this.props.status) {
      case 'watched':
        status = 'lct-played';
        break;
      case 'notwatched':
        status = 'lct-not-played';
        break;
      case 'watching':
        status = 'lct-playing';
        break;
    }
    
    return (
        <div className="box-playlist">
          <div className="row">
            <div className="col-sm-4 pl pl-first">
              <img className="playlist-thumb" src={this.props.thumb}/>
            </div>
            <div className="col-sm-7 pl">
              <div className="playlist-ct-title"><p>{this.props.title}</p></div>
            </div>
            <div className="col-sm-1 pl">
              <div className="playlist-content-item-stats " + status></div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = PlaylistRow;
;