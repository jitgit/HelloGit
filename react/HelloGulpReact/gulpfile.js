'use strict';

var gulp = require('gulp');
var scriptTask = require('./src/sdk/scriptTask')(gulp);
var assetsTask = require('./src/sdk/assetsTask')(gulp);
//var liveReloadTask = require('./src/sdk/liveReloadTask')(gulp);
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var gulpSequence = require('gulp-sequence');


gulp.task('clean', function () {
    return gulp.src('./build/', {force: true})
        .pipe(clean());
});
var THIRD_PARTY_LIBS = ['bower_components/jquery/dist/jquery.js'];
gulp.task('third-party', function () {
    return gulp.src(THIRD_PARTY_LIBS)
        .pipe(concat('external-libs.js'))
        .pipe(gulp.dest('./build/'));
});
// Basic usage
gulp.task('scripts', scriptTask.browserifyModuleTask(['main-1.js', 'main-2.js'], 'src/scripts/app/'));
gulp.task('less', assetsTask.cssTask('./src/**/*.less', 'app.css'));
gulp.task('html', assetsTask.htmlTask('src/**/*.html'));


//TODO
//var liveReloadTask = require('./src/sdk/liveReloadTask')(gulp, appPort, reloadPort);
//gulp.task('build-re-load', liveReloadTask.serverAndLiveReload(['html', 'scripts', 'less']));

var reloadPort = 9092;
var appPort = 9090;
gulp.task('express-server', function () {
    console.log('Starting express server...');
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: reloadPort}));
    app.use(express.static(__dirname + '/build/'));
    app.listen(appPort, '0.0.0.0');
});

var tinylr;
gulp.task('livereload', function () {
    tinylr = require('tiny-lr')();
    tinylr.listen(reloadPort);
});
gulp.task('build-re-load', function (callback) {
    gulpSequence('html', 'scripts', 'less', 're-load')(callback);
});
gulp.task('re-load', function () {
    console.log('Re-loading...');
    notifyLiveReload();
});
function notifyLiveReload() {
    //var fileName = require('path').relative(__dirname, event.path);
    //console.log(fileName);
    tinylr.changed({
        body: {
            files: ['src\*.html']
        }
    });
}
gulp.task('watch', function () {
    gulp.watch(['src/**/*.*'], ['build-re-load']);
});


gulp.task('default', gulpSequence('clean', ['third-party', 'html', 'scripts', 'less'], 'livereload', 'express-server', 'watch'));
