'use strict';

var CONSTANTS = require('./constants');
var gulp = require('gulp');

gulp.task('watch', ['styles'], function() {
    // gulp.watch([CONSTANTS.SRC_DIR + '/css/*.scss', CONSTANTS.SRC_DIR + '/app/**/*.scss' ], ['styles']);
    gulp.watch(['css/*.scss', 'app/**/*.scss' ], {cwd: CONSTANTS.SRC_DIR}, ['styles', 'copy']);

    gulp.watch('images/svg/src/*.svg', {cwd: CONSTANTS.SRC_DIR}, ['svg', 'copy']);
    gulp.watch('images/*', {cwd: CONSTANTS.SRC_DIR}, ['copy']);

    gulp.watch(['app/**/*.js', 'app/*.js'] , {cwd: CONSTANTS.SRC_DIR}, ['js', 'copy']);
});