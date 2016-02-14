'use strict';

var CONSTANTS = require('./constants'),
    browserSync = require('browser-sync'),
    gulp = require('gulp');

gulp.task('watch', ['css'], function() {
    // gulp.watch([CONSTANTS.SRC_DIR + '/css/*.scss', CONSTANTS.SRC_DIR + '/app/**/*.scss' ], ['styles']);
    gulp.watch(['css/*.css', 'css/**/*.css', '!css/*.min.css'], {
        cwd: CONSTANTS.SRC_DIR
    }, ['css']).on("change", browserSync.reload);

    gulp.watch('images/svg/src/*.svg', {
        cwd: CONSTANTS.SRC_DIR
    }, ['svg']).on("change", browserSync.reload);
    // gulp.watch('images/*', {cwd: CONSTANTS.SRC_DIR}, ['copy']);

    gulp.watch(['js/**/*.js', 'js/*.js', 'js/*.min.js'], {
        cwd: CONSTANTS.SRC_DIR
    }, ['js']).on("change", browserSync.reload);

});
