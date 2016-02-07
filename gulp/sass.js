'use strict';

var CONSTANTS = require('./constants');
var gulp = require('gulp');

var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");

gulp.task('styles', function() {
    return gulp.src( CONSTANTS.SRC_DIR +'/css/main.scss' )
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({
        	outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
        	browsers: [
    			'last 2 version'
      		]
		}))
        .pipe(sourcemaps.write('.'))
        .on('error', notify.onError(function (error) {
            return error.message;
        }))
        .pipe(gulp.dest(CONSTANTS.DEST_DIR +'/css/'));
});