'use strict';

var gulp = require('gulp');
var CONSTANTS = require('./constants');

gulp.task('watch', ['styles'] ,function () {
  gulp.watch(CONSTANTS.CSS_DIR + '/**/*.scss', ['styles']);
  gulp.watch(CONSTANTS.JS_DIR + '/**/*.js', ['scripts', 'inject']);
  gulp.watch(CONSTANTS.IMAGE_DIR + '/**/*', ['images']);
});