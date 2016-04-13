module.exports = function(grunt) {
    var cwd = process.cwd();
    process.chdir(__dirname + '/../..');
    console.log("Loading task - ");
    grunt.file
        .expand('../node_modules/grunt-*/tasks')
        .forEach(function(task) {
            console.log(task);
            grunt.loadTasks(task);
        });
    process.chdir(cwd);
};
