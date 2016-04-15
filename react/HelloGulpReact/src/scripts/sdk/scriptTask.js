var browserify = require('browserify');
var plumber = require('gulp-plumber');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var es = require('event-stream');
//var streamify = require('gulp-streamify');

module.exports = function (gulp) {
    return {
        browserifyModuleTask: function (entires, baseDir) {
            // Single entry point to browserify
            return function () {
                var tasks = entires.map(function (entry) {
                    console.log(baseDir + entry);
                    return browserify({
                        entries: [baseDir + entry],
                        nobuiltins: 'events querystring',
                        transform: [reactify] // We want to convert JSX to normal javascript
                    }).bundle()
                        .pipe(source(entry, baseDir))
                        .pipe(rename({// rename them to have "bundle as postfix"
                            extname: '.bundle.js'
                        }))
                        //.pipe(streamify(uglify()))
                        .pipe(gulp.dest('./build'));
                });
                // create a merged stream
                return es.merge.apply(null, tasks);
            }
        }
    }
};
