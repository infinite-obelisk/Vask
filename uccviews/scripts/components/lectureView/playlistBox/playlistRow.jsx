var React          = require('react');
var lectureActions = require('../../../actions/lectures');

var PlaylistRow = React.createClass({

  getInitialState: function(){
    return {
      status: 'notwatched'
    }
  },

  componentWillReceiveProps: function(nextProps) {
    // console.log('ROW', 'nextProps', nextProps.status);
    // console.log('ROW', 'state', this.state.status);
    if (this.state.status !== nextProps.status) {
      this.setState({
          status: nextProps.status
        });
    }
  },

  update: function(){
    // console.log('update playlist -->', this.props.shortUrl);
    lectureActions.getPlaylist(this.props.shortUrl);
    lectureActions.getLectureInfo(this.props.shortUrl); 
  },


  render: function() {
    // console.log('title', this.props.title);
    // console.log('thumb', this.props.thumb);
    // console.log('playlistRow status', this.props.status);
    // console.log('status', this.props.shortUrl);
    
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
              <a href={"/lectures/" + this.props.shortUrl} onClick={this.update}>
                <img className="playlist-thumb" src={this.props.thumb}/>
              </a>
            </div>
            <div className="col-sm-7 pl">
              <div className="playlist-ct-title"><p>{this.props.title}</p></div>
            </div>
            <div className="col-sm-1 pl">
              <div className={"playlist-content-item-stats " + status}></div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = PlaylistRow;
;