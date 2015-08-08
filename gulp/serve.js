'use strict';

var gulp = require('gulp');
var CONSTANTS = require('./constants');

var browserSync = require('browser-sync');
var httpProxy = require('http-proxy');
var modRewrite = require('connect-modrewrite');

/* This configuration allow you to configure browser sync to proxy your backend */
var proxyTarget = 'http://server/context/'; // The location of your backend

var proxy = httpProxy.createProxyServer({
    target: proxyTarget
});

/* proxyMiddleware forwards static file requests to BrowserSync server
   and forwards dynamic requests to your real backend */
function proxyMiddleware(req, res, next) {
    if (/\.(html|css|js|png|jpg|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|woff2|json|mp3|m4a|ogg)(\?((r|v|rel|rev)=[\-\.\w]*)?)?$/.test(req.url)) {
        next();
    } else {
        proxy.web(req, res);
    }
}

function browserSyncInit(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;

    browserSync.instance = browserSync.init(files, {
        startPath: '/index.html',
        server: {
            baseDir: baseDir,
            middleware: [
                modRewrite(['^[^\\.]*$ /index.html [L]']),
                proxyMiddleware
            ]
        },
        browser: browser
    });

}

gulp.task('serve', ['watch'], function() {
    browserSyncInit([CONSTANTS.SRC_DIR, '.tmp'], [
        CONSTANTS.SRC_DIR + '*.html',
        CONSTANTS.SRC_DIR + 'styles/**/*.css',
        '.tmp/styles/**/*.css',
        CONSTANTS.SRC_DIR + 'scripts/**/*.js',
        CONSTANTS.SRC_DIR + 'images/**/*'
    ]);
});

gulp.task('serve:dist', ['build'], function() {
    browserSyncInit('dist');
});
