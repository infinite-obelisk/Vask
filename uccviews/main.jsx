var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin;

var App = React.createClass({

    routes: {
        '/': 'lecturesList',
        '/lists/:id/:nested*': 'viewList'
    },

    mixins: [RouterMixin],

    getInitialState: function(){
    	return {
    		lists: [{id: 001, name: 'task1'},{id: 002, name: 'task2'},{id: 003, name: 'task3'}]
    	}
    },

    render: function() {
        return <div>{this.renderCurrentRoute()}</div>;
    },

    lecturesList: function() {
        return (
            <div>
                <ul className="lists list-group">
                {this.state.lists.map(function(list) {
                    return (
	                    <li className="list-group-item" key={list.id}>
                            <a href={'/lists/' + list.id + '/'}>{list.name}</a>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    },

    viewList: function(id) {
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

