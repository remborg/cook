'use strict';

var CONSTANTS = require('./constants'),
    gulp = require('gulp'),
    copy = require("gulp-copy");

gulp.task('build', ['build:js', 'build:images'], function() {});

gulp.task('build:js', function() {
    return gulp.src(['../bower_components/**/*', 'js/**/*'], {
            cwd: CONSTANTS.SRC_DIR
        })
        .pipe(gulp.dest(CONSTANTS.DEST_DIR + '/js'));
});

gulp.task('build:images', function() {
    return gulp.src(['images/**/*', '!images/svg/src', '!images/svg/src/*'], {
            cwd: CONSTANTS.SRC_DIR
        })
        .pipe(gulp.dest(CONSTANTS.DEST_DIR + '/images'));
});
