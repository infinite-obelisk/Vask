var React = require('react');
var PlaylistRow = require('./playlistRow.jsx');

var Playlist = React.createClass({


  render: function() {
    console.log('related playlistBox state PROPS',this.props.related);
    console.log('related playlistBox state STATE',this.state);
    
    var rows = [];
    if (this.props.related !== undefined) {
      rows = this.props.related.map(function(lect, i){
        return <PlaylistRow title={lect.title} thumb={lect.imgUrl} status={lect.wstatus} key={i}/>
      });
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
});

module.exports = Playlist;
;