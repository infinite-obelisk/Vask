var gulp        = require('gulp'),
    browserify  = require('gulp-browserify'),
    shell = require('gulp-shell'),
    concat      = require('gulp-concat');

// COMPILES JSX --> JS
gulp.task('scripts', function () {

  gulp.src(['uccviews/scripts/main.jsx'])
      .pipe(browserify({
          debug: true,
          transform: [ 'reactify' ]
      }))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./client/build/js/'))
});

gulp.task('server', shell.task([
  'nodemon server/server.js'
]))

gulp.task('watch', ['scripts'], function(){
  gulp.watch('./uccviews/scripts/components/**/*.jsx', ['scripts']);
});

gulp.task('default', ['scripts', 'server', 'watch']);

gulp.task('compile', ['scripts', 'server']);

gulp.task('production', ['scripts']);
