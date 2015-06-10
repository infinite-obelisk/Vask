var React = require('react');
var PlaylistRow = require('./playlistRow.jsx');
var ProgressBar = require('react-bootstrap').ProgressBar;

var Playlist = React.createClass({

  getInitialState: function(){
    return {
      playingNow: 'undefined'
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.state.playingNow !== nextProps.playingNow) {
      this.setState({
          playingNow: nextProps.playingNow
        });
    }
  },

  render: function() {
    // console.log('related playlistBox state PROPS',this.props.related);
    console.log('RELATEDDDDDDDDDDDDDD',this.props);
    // var self = this;
    
    var rows = [];
    var newState = {};
    if (this.props.related !== undefined) {
      rows = this.props.related.map(function(lect, i){
        console.log('newState', newState, 'status', lect.wstatus);
        return <PlaylistRow 
                  title={lect.title} 
                  thumb={lect.imgUrl} 
                  status={lect.wstatus} 
                  shortUrl={lect.shortUrl} 
                  key={i}/>
      });
    }
    // set the state
    // self.setState(newState);
    // console.log('AJAJAJAJAJAJAJAJAJAJAJAJAJ',newState);

    return (
      <div>
        <div className="row progressbar-box">
          <div className="col-sm-9">
            <ProgressBar now={this.props.progress} style={{"width":"360px"}}/>
          </div>
          <div className="col-sm-3">
            <div className="progressbar-value">{this.props.progress}%</div>
          </div>
        </div>
        {rows}
      </div>
    );
  }
});

module.exports = Playlist;
;