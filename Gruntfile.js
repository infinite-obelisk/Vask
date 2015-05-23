module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['client/build/*', 'server/*']
    },
    watch: {
      files: ['client/*.html', 'client/build/*', 'client/views/*', 'server/*', 'test/*'],
      tasks: ['jshint']
    },
    exec: {
      reactify: {
        //Will have to add a browserify for each. Gross, I know -Kir
        command: "browserify -t reactify jsx/lectureView.js -o client/build/lectureView.js"
      }
    },
    uglify: {
      my_target: {
        files: {
          'client/build/lectureView.min.js': ['client/build/lectureView.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('reactifies', ['exec', 'uglify']);

};