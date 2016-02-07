'use strict';

var CONSTANTS = require('./constants');
var gulp = require('gulp');

var copy = require("gulp-copy");

gulp.task('copy', ['copyJs', 'copyImages'], function() {});

gulp.task('copyJs', function() {
    return gulp.src(['../bower_components/**/*'], {
            cwd: CONSTANTS.SRC_DIR
        })
        .pipe(gulp.dest(CONSTANTS.DEST_DIR + '/js'));
});

gulp.task('copyImages', function() {
    return gulp.src(['images/**/*', '!images/svg/src', '!images/svg/src/*'], {
            cwd: CONSTANTS.SRC_DIR
        })
        .pipe(gulp.dest(CONSTANTS.DEST_DIR + '/images'));
});
