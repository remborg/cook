'use strict';

var CONSTANTS = require('./constants'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    notify = require("gulp-notify");

gulp.task('js', function() {
    return gulp.src(['js/**/*.js', 'js/*.js', '!js/*.min.js'], {
            cwd: CONSTANTS.SRC_DIR
        })
        .pipe(eslint({
            ecmaFeatures: {
                'modules': true
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on('error', notify.onError(function(error) {
            var errorMessage = error.message;
            if (error.name === 'ESLintError')
                errorMessage = 'ESLint - ' + errorMessage;
            return errorMessage;
        }))
        // .pipe(gulp.dest(CONSTANTS.SRC_DIR +'/'))
        .pipe(sourcemaps.init())
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', notify.onError(function(error) {
            var errorMessage = error.message;
            return errorMessage;
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .on('error', notify.onError(function(error) {
            console.log('notification');
            return error.message;
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(CONSTANTS.SRC_DIR + '/js'));
});
