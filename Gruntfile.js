module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['uccviews/jsx/*', 'server/*']
    },
    watch: {
      files: ['client/*.html', 'client/build/*', 'client/views/*', 'server/*', 'test/*'],
      tasks: ['jshint']
    },
    exec: {
      reactify: {
        //Will have to add a browserify for each. Gross, I know -Kir
        command: "browserify -t reactify uccviews/jsx/lectureView.js -o client/build/js/lectureView.js && browserify -t reactify uccviews/jsx/template.js -o client/build/js/template.js && browserify -t reactify uccviews/jsx/dynamicSearch.jsx -o client/build/js/dynamicSearch.js"
      },
      server: {
        command: "node server/server.js"
      }
    },
    uglify: {
      my_target: {
        files: {
          'client/build/js/lectureView.min.js': ['client/build/js/lectureView.js']
        }
      }
    },
    less: {
      dist: {
        files: {
          "client/build/css/material-ui.css": "uccviews/less/material-ui.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('reactifies', ['exec:reactify']); //, 'uglify']);
  grunt.registerTask('default', ['reactifies', 'exec:server']);

};