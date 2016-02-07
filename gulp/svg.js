'use strict';

var CONSTANTS = require('./constants');
var gulp = require('gulp');

var svgSprite = require('gulp-svg-sprite');
var notify = require("gulp-notify");

gulp.task('svg', function() {
	var config = {
        shape: {
            spacing: { // Add padding
                padding: 1
            },
            dest:  CONSTANTS.SRC_DIR +'/images/svg'
        },
	    mode: {
	        view: {// Activate the «view» mode
                    bust: false,
                    render: {
                        scss: {
                            dest:  CONSTANTS.SRC_DIR +'/css/svgSprite'
                        }
                    },
                    dest: '',
                    sprite: CONSTANTS.SRC_DIR + '/images/sprite'
                }
            }
		};

    return gulp.src( CONSTANTS.SRC_DIR + '/images/svg/src/*.svg')
        .pipe(svgSprite(config))
        .on('error', notify.onError(function (error) {
	      	return error.message;
	    }))
        .pipe(gulp.dest(CONSTANTS.DEST_DIR +'/images/'));
});