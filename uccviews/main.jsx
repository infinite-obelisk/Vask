var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin,
    LectureList = require('./jsx/lecturesListView.jsx');

var App = React.createClass({

    routes: {
        '/': 'lecturesList',
        '/contents/:url': 'lectures'
    },

    mixins: [RouterMixin],

    render: function() {
        return <div>{this.renderCurrentRoute()}</div>;
    },

    lecturesList: function() {
        return (
            <div>
                <LectureList/>
            </div>
        );
    },

    lectures: function(id) {
	    var list = this.state.lists.reduce(function(found, list) {
		    if (list.id == id) { return list; }
		    return found;
	    });

        return <TodoList list={list} root={'/lists/' + id}/>;
    },

    notFound: function(path) {
        return <div className="not-found">Uh oh. {path} doesnt exist.</div>;
    }

});

React.render(<App history={true}/>, document.getElementById('app')
);

