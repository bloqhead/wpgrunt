/* global module:false */
module.exports = function(grunt) {
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n": "" %>',
        sass: {
            scss: {
                files: [ {
                    style: 'compressed',
                    expand: true,
                    flatten: true,
                    cwd: 'library/scss',
                    src: ['**/*.scss', '!**/_*.scss'],
                    dest: 'library/css/',
                    ext: '.css'
                } ]
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [ {
                    expand: true,
                    flatten: true,
                    cwd: 'library/img/',
                    src: ['*.png', '*.jpg'],
                    dest: 'library/img/'
                } ]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: {
                    'library/js/build.js': [
                        'library/js/vendor/*.js',
                        'library/js/scripts.js',
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'library/js/build.min.js': [ 'library/js/build.js' ]
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'library/css/style.min.css': [ 'library/css/style.css' ],
                    'library/css/ie.min.css': [ 'library/css/ie.css' ]
                }
            }
        },
        // Task configuration.
        watch: {
            dist: {
                files: ['library/scss/**/*.scss','library/js/**/*.js'],
                tasks: ['sass','uglify','concat','cssmin','imagemin'],
                options: {
                    livereload: true
                }
            }
        }
    });
    // Task Plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Tasks
    grunt.registerTask('default', ['sass','concat']);
    grunt.registerTask('build', ['default','uglify','cssmin','imagemin'])
};