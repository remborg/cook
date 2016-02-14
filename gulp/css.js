'use strict';

var CONSTANTS = require('./constants'),
    gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    notify = require("gulp-notify"),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    precss = require('precss'),
    reload = browserSync.reload;

gulp.task('css', function() {
    var processors = [autoprefixer({
            browsers: ['last 2 version']
        }),
        cssnext,
        precss
    ];
    return gulp.src(CONSTANTS.SRC_DIR + '/css/main.css')
        .pipe(postcss(processors))
        .on('error', notify.onError(function(error) {
            return error.message;
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(CONSTANTS.SRC_DIR + '/css'))
        .pipe(reload({
            stream: true
        }));;
});
