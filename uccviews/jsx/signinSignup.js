var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var React = require('react'),
    mui = require('material-ui'),
    AppBar = mui.AppBar,
    TextField = mui.TextField,
    RaisedButton = mui.RaisedButton;

var ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

var NavBar = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext:function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  render: function(){
    return (<AppBar title="Vask" />);
  }
});

var SigninSignup = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext:function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  render: function(){
    return (<div>
              <TextField
                floatingLabelText="Username"
                id="username" />
              <br />
              <TextField
                floatingLabelText="Password"
                type="password"
                id="password" />
            </div>);
  }
});

var SignupExtra = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext:function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  render: function(){
    return (<TextField
              floatingLabelText="Password again"
              type="password"
              id="password2" />);
  }
});

var Login = React.createClass({
  signin: function() {
    var name = document.getElementById('username').value;
    var pwd = document.getElementById('password').value;
    console.log('login', name);
    $.ajax({
      url: "/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username : name, password : pwd}),
      statusCode: {
        201: function (data) {
          console.log('win');
          console.log(data);
        },
        500: function (err) {
          console.log('lose')
        }
      }
    });
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext:function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  render: function(){
    return (<div
              className="login">
                <RaisedButton
                  label="Login"
                  primary={true}
                  onClick={this.signin}/>
            </div>);
  }
});

var Signup = React.createClass({
  signup: function() {
    var name = document.getElementById('username').value;
    var pwd = document.getElementById('password').value;
    var pwd2 = document.getElementById('password2').value;
    if (pwd!==pwd2) {
      alert('passwords different');
      return;
    }
    console.log('signup', name);
    $.ajax({
      url: "/signup",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username : name, password : pwd}),
      statusCode: {
        302: function (data) {
          console.log('win');
          console.log(data);
        },
        500: function (err) {
          console.log('lose')
        }
      }
    });
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext:function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  render: function(){
    return (<div
              className="signup">
                <RaisedButton
                  label="Sign Up"
                  primary={true}
                  onClick={this.signup}/>
            </div>);
  }
});

var SwitchButton = React.createClass({
  getInitialState: function(){
    return {buttonLabel: "Signup Instead"}
  },
  switchState: function(){
    if(this.state.buttonLabel === "Signup Instead"){
      this.setState({buttonLabel: "Login Instead"});
      $(".signup").show();
      $(".login").hide();
    } else {
      this.setState({buttonLabel: "Signup Instead"});
      $(".signup").hide();
      $(".login").show();
    }
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext:function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  render: function(){
    return (<RaisedButton
            label={this.state.buttonLabel}
            secondary={true}
            onClick={this.switchState}/>);
  }
});

React.render(<NavBar />,
  document.querySelector('.nav-bar')
);

React.render(<SigninSignup />,
  document.querySelector('.signin-signup-form')
);

React.render(<SignupExtra />,
  document.querySelector('.signup-extra')
);

React.render(<Login />,
  document.querySelector('.login-button')
);

React.render(<Signup />,
  document.querySelector('.signup-button')
);

React.render(<SwitchButton />,
  document.querySelector('.switch-button')
);

module.exports = NavBar;