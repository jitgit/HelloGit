var GRUNT_SDK = require('./src/sdk/main.js');
module.exports = function (grunt) {
    var ThirdParty = ['node_modules/react/dist/react.js', 'node_modules/react-dom/dist/react-dom.js', 'bower_components/jquery/dist/jquery.js'];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'jsbeautifier': {
            files: ['src/**/*.js'],
            options: {
                js: {
                    indentSize: 4
                },
                html: {
                    indentSize: 4
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: false,
                newcap: true,
                noarg: true,
                sub: true,
                undef: false,
                boss: true,
                eqnull: true,
                node: true,
                globals: {
                    exports: true,
                    module: false
                }
            },
            all: ['src/**/*.js', 'test/**/*.js']
        },
        browserify: {
            dist: {
                files: {
                    '.tmp/app-js': ['src/scripts/App.js']
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [ThirdParty, '.tmp/app-js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= grunt.config("concat").dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
    });

    console.log(grunt.config('jsbeautifier').files);
    GRUNT_SDK.loadNodeModulesGruntTask(grunt);
    // Default task(s).
    grunt.registerTask('default', ['jsbeautifier', 'jshint', "browserify", 'concat', 'uglify']);

};
