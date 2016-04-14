var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var gulpSequence = require('gulp-sequence');
var path = require('path');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

gulp.task('clean', function () {
    return gulp.src('./build/', {force: true})
        .pipe(clean());
});

THIRD_PARTY_LIBS = ['bower_components/jquery/dist/jquery.js'];
gulp.task('third-party', function () {
    return gulp.src(THIRD_PARTY_LIBS)
        .pipe(concat('external-libs.js'))
        .pipe(gulp.dest('./build/'));
});
// Basic usage
gulp.task('scripts', function () {
    // Single entry point to browserify
    return gulp.src('src/scripts/ApplicationBootStrap.js')
        .pipe(plumber())
        .pipe(browserify({
            nobuiltins: 'events querystring',
            transform: [reactify], // We want to convert JSX to normal javascript
            debug: true // Gives us sourcemapping
        }))
        //.pipe(uglify())
        .pipe(gulp.dest('./build/'));
});

gulp.task('less', function () {
    return gulp.src('./src/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./build/'));
});

// Basic usage
gulp.task('html', function () {
    return gulp.src('src/**/index.html')
        .pipe(gulp.dest('./build/'));
});
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
            files: ['src\index.html']
        }
    });
}
gulp.task('watch', function () {
    gulp.watch(['src/**/*.*'], ['build-re-load']);
});


gulp.task('default', gulpSequence('clean', ['third-party', 'html', 'scripts', 'less'], 'livereload', 'express-server', 'watch'));