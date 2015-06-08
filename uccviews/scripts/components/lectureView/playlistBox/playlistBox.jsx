var React = require('react');
var PlaylistRow = require('./playlistRow.jsx');

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
    // console.log('related playlistBox state STATE',this.state);
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
        {rows}
      </div>
    );
  }
});

module.exports = Playlist;
;