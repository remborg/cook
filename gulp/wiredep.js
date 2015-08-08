'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  //exclude: [  'bower_components/modernizr/modernizr.js' ],

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
        directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      exclude: [ 'bower_components/modernizr/modernizr.js' ]
    }))
    .pipe(gulp.dest('app'));
});