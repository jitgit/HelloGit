'use strict';

var gulp = require('gulp');
var scriptTask = require('./src/sdk/scriptTask')(gulp);
var assetsTask = require('./src/sdk/assetsTask')(gulp);
//var liveReloadTask = require('./src/sdk/liveReloadTask')(gulp);
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var gulpSequence = require('gulp-sequence');


gulp.task('clean', function () {
    return gulp.src('./build/', {force: true})
        .pipe(clean());
});
var THIRD_PARTY_LIBS = ['bower_components/jquery/dist/jquery.js'];
gulp.task('third-party', scriptTask.thirdPartyDependencyTask(THIRD_PARTY_LIBS));
gulp.task('test-libs', scriptTask.testLibs(['src/sdk/jasmine-2.4.1/**.**']));
// Basic usage
gulp.task('scripts', scriptTask.browserifyModuleTask([ 'todo/TodoApp.js'], 'src/scripts/app/'));
gulp.task('test-scripts', scriptTask.browserifyModuleTask(['tests.js'], 'test/'));
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
gulp.task('build-test-re-load', function (callback) {
    gulpSequence('test-scripts', 're-load')(callback);
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
    gulp.watch(['test/**/*.*'], ['build-test-re-load']);
});


gulp.task('default', gulpSequence('clean', ['third-party', 'html', 'scripts', 'less', 'test-libs', 'test-scripts'], 'livereload', 'express-server', 'watch'));
