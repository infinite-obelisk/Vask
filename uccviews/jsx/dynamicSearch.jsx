 /** @jsx React.DOM */

var React        = require('react'),
    RaisedButton = require('material-ui/lib/raised-button'),
    TextField 	 = require('material-ui/lib/text-field'),
    Paper        = require('material-ui/lib/paper'),
    ThemeManager = require('material-ui/lib/styles/theme-manager')(),
    Colors       = require('material-ui/lib/styles/colors'),
    fakeData     = require('./fakeData.js'),
    $            = require('jquery/dist/jquery.js');


var DynamicSearch = React.createClass({
	addQuestion: function(){
		$.ajax({
		  url: "/addquestion",
		  method: "POST",
		  contentType: "application/json",
		  data: JSON.stringify({video : '1234', text : 'text', username : 'name', time : 50}),
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
	getQuestions: function(){
		console.log('jQuery', $);
		$.ajax({
		  url: "/getquestions",
		  method: "GET",
		  contentType: "application/json",
		  success: function(data){
		    console.log( "Data received: ");
		    console.dir( data );
		  },
	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	      console.error("Failed fetching the server");
	      throw errorThrown;
	    }
		});
	},
	componentWillMount: function(){
		console.log('Fetching questions..');
		this.getQuestions()
	},	
	getInitialState: function(){
		return {
			count: 0,
			text: ''
		}
	},
	handleUserInput: function(text, count){
		this.setState({
			count: count,
			text: text
		});
		// console.log(React.findDOMNode(this.refs.search.refs.inp).children[1].value);
	},
	// shouldComponentUpdate: function(nextProps, nextState){
	// 	// console.log("shouldComponentUpdate",  "\n\tnextProps:", nextProps, "\n\tnextState:", nextState);
	// 	return nextState.count >= 3 
	// },
	render: function() {
		return (
			<div>
				<SearchBar ref="search" onUserInput={this.handleUserInput}></SearchBar>
				<QuestionList 
					text={this.state.text} 
					count={this.state.count} 
					data={this.props.data}/>
				<p>{this.state.count}</p>
			</div>
		);
	}
});

var SearchBar = React.createClass({
	
	childContextTypes: {
	  muiTheme: React.PropTypes.object
	},

	getChildContext: function() {
	  return {
	    muiTheme: ThemeManager.getCurrentTheme()
	  };
	},

	componentWillMount: function() {
	  ThemeManager.setPalette({
	    accent1Color: Colors.deepOrange500
	  });
	},

	handleChange: function(){
		this.props.onUserInput(
			React.findDOMNode(this.refs.inp).children[1].value,
			React.findDOMNode(this.refs.inp).children[1].value.length
		);
	},

	render: function() {
		return (
			<div>
				<TextField hintText="Hint Text" ref="inp" onChange={this.handleChange}/>
				<RaisedButton label="Search" primary={true}/>
			</div>
		);
	}
});

var QuestionList = React.createClass({

	render: function() {
	

		var questions = [];
		var text = this.props.text.toLowerCase();
		// create the list of questions
		this.props.data.map(function(item, i){
			// simple algorithm to filter the data that should appear
			if(item.question.toLowerCase().indexOf(text) !== -1 && text.length >= 3) {
				// send this question component into question's array
				questions.push(
					<QuestionItem key={i} question={item.question}></QuestionItem>
					);
			}
			
		});
		return (
			<div>
				<h3>Questions that may already have your answer</h3>
				<ul>{ questions }</ul>
			</div>
		);
	}
});

var QuestionItem = React.createClass({
	render: function() {
		return (
			<div>
			  <li>{ this.props.question }</li>
			</div>
			
		);
	}
});

React.render(<DynamicSearch data={fakeData}/>, document.getElementById('react-mount'));
