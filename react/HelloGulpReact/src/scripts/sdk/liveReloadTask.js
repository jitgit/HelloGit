var tinylr = require('tiny-lr')();
var gulpSequence = require('gulp-sequence');
module.exports = function (gulp, appPort, reloadPort) {

    console.log('Starting express server...' + __dirname + '/../../build/');
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: reloadPort}));
    app.use(express.static(__dirname + '/../../build/'));
    app.listen(appPort, '0.0.0.0');

    tinylr.listen(reloadPort);

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

    return {
        preReloadTasks: [],
        serverAndLiveReload: function (preReloadTasks) {
            var self = this;
            self.preReloadTasks = preReloadTasks;
            return function (callback) {
                console.log('--------> preReloadTasks: ',self.preReloadTasks);
                var task = preReloadTasks;
                gulpSequence(task, 're-load')(callback);
                //gulpSequence.apply(this,preReloadTasks,callback);

            };
        }
    }
};
