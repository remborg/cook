'use strict';

var CONSTANTS = require('./constants'),
    gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    notify = require("gulp-notify");


gulp.task('svg', function() {
    var config = {
        shape: {
            spacing: { // Add padding
                padding: 1
            },
            dest: CONSTANTS.SRC_DIR + '/images/svg'
        },
        mode: {
            view: { // Activate the «view» mode
                bust: false,
                render: {
                    css: {
                        dest: CONSTANTS.SRC_DIR + '/css/svgSprite'
                    }
                },
                dest: '',
                sprite: CONSTANTS.SRC_DIR + '/images/sprite'
            }
        }
    };

    return gulp.src(CONSTANTS.SRC_DIR + '/images/svg/src/*.svg')
        .pipe(svgSprite(config))
        .on('error', notify.onError(function(error) {
            return error.message;
        }))
        .pipe(gulp.dest('.'));
});
