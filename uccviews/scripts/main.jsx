var React       = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin,
    LecturesList = require('./components/lecturesList/lecturesList.jsx'),
    mui      = require('material-ui'),
    AppBar   = mui.AppBar,
    MaterialMixin     = require('./mixins/material-ui.js');

var App = React.createClass({

    routes: {
        '/': 'lecturesList',
        '/lectures/:url': 'lectureView'
    },

    mixins: [RouterMixin, MaterialMixin],

    render: function() {
        return <div>{this.renderCurrentRoute()}</div>;
    },

    lecturesList: function() {
        return (
            <div>
                <AppBar title='VASK' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <LecturesList/>
            </div>
        );
    },

    lectureView: function(url) {
        console.log('URL',url);
        return <div>{url}</div>;
	    // var list = this.state.lists.reduce(function(found, list) {
		   //  if (list.id == id) { return list; }
		   //  return found;
	    // });

        // return <TodoList list={list} root={'/lists/' + id}/>;
    },

    notFound: function(path) {
        return <div className="not-found">Uh oh. {path} doesnt exist.</div>;
    }

});

React.render(<App history={true}/>, document.getElementById('app')
);

