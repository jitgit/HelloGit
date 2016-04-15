var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');

module.exports = function (gulp) {
    return {
        cssTask: function (source, targetCssName) {
            // Single entry point to browserify
            return function () {
                return gulp.src(source)
                    .pipe(less({
                        paths: [path.join(__dirname, 'less', 'includes')]
                    }))
                    .pipe(concat(targetCssName))
                    .pipe(gulp.dest('./build/'));
            };
        },
        htmlTask: function (htmlSources) {
            // Single entry point to browserify
            return function () {
                return gulp.src(htmlSources)
                    .pipe(gulp.dest('./build/'));
            };
        }
    }
};
