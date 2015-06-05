var React = require('react');

var HeaderLeftMenu = React.createClass({
  render: function() {
    return (
      <h3 style={{
        "background-color": "#00bcd4", 
        "color": "#fff",
        "padding": "20px",
        "margin": "0px"
      }}>Vask</h3>
    );
  }
});

module.exports = HeaderLeftMenu;