'use strict';

var gulp = require('gulp');
var CONSTANTS = require('./constants');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'del']
});

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

gulp.task('styles', function() {
    return gulp.src( CONSTANTS.CSS_DIR + '/**/*.scss')
        .pipe($.sass({
            style: 'expanded'
        }))
        .on('error', handleError)
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('scripts', function() {
    return gulp.src( CONSTANTS.JS_DIR + '/**/*.js')
        //.pipe($.jshint())
        //.pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
});

gulp.task('html', ['styles'], function() {
    var jsFilter = $.filter(['**/*.js'], {restore: true});
    var cssFilter = $.filter(['**/*.css'], {restore: true});
    var assets;

    return gulp.src( CONSTANTS.SRC_DIR + '/*.html')
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest( CONSTANTS.BUILD_DIR + ''))
        .pipe($.size());
});

gulp.task('images', function() {
    return gulp.src( CONSTANTS.IMAGE_DIR + '/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest( CONSTANTS.BUILD_DIR + '/images'))
        .pipe($.size());
});

gulp.task('fonts', function() {
    return gulp.src( CONSTANTS.FONT_DIR + '/**/*', $.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest( CONSTANTS.BUILD_DIR + '/fonts'))
        .pipe($.size());
});

gulp.task('clear', function(done) {
    return $.cache.clearAll(done);
});

gulp.task('clean', ['clear'], function() {
    return $.del(['.tmp', 'dist']);
});

gulp.task('build', ['clean', 'html', 'images', 'fonts']);
