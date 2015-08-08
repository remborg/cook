'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts', 'inject']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch(['bower.json'], ['wiredep']);
});