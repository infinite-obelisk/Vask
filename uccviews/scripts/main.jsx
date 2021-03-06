var React           = require('react'),
    RouterMixin     = require('react-mini-router').RouterMixin,
    LecturesList    = require('./components/lecturesList/lecturesList.jsx'),
    CoursesList    = require('./components/coursesList/coursesList.jsx'),
    mui             = require('material-ui'),
    NavBar            = require('./components/navBar/navBar.jsx'),
    // AppBar          = mui.AppBar,
    MaterialMixin   = require('./mixins/material-ui.js'),
    LectureView     = require('./components/lectureView/lectureView.jsx'),
    injectTapEventPlugin = require("react-tap-event-plugin");

    injectTapEventPlugin();

var App = React.createClass({

    routes: {
        '/': 'lecturesList',
        '/courses': 'coursesList',
        '/lectures': 'lecturesList',
        // '/courses/create': 'newCourse',
        // '/lectures/create': 'newLecture',
        '/lectures/:url': 'lectureView'
    },

    mixins: [RouterMixin, MaterialMixin],

    render: function() {
        return <div>{this.renderCurrentRoute()}</div>;
    },

    lecturesList: function() {
        return (
            <div>
                <NavBar title='VASK' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <LecturesList/>
            </div>
        );
    },

    coursesList: function() {
        return (
            <div>
                <NavBar title='VASK' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <CoursesList/>
            </div>
        );
    },

    lectureView: function(url) {
        console.log('URL',url);
        return (<div>
                    <NavBar title='VASK' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                    <LectureView shortUrl={url} />
                </div>
            );

    },

    newCourse: function(){
        return (
            <h1>New COURSE page</h1>
        );
    },

    newLecture: function(){
        return (
            <h1>New LECTURE page</h1>
        );
    },


    notFound: function(path) {
        return <div className="not-found">Uh oh. {path} doesnt exist.</div>;
    }

});

React.render(<App history={false}/>, document.getElementById('app')
);

