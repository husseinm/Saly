'use strict';

module.exports = function (grunt) {
    // Ctrl + C
    process.on('SIGINT', function() {
      grunt.util.spawn({
        cmd: 'grunt',
        args: ['shell:cleanBowerTemp']
      }, function(error, result, code) {
        if (error) {
          console.log('Error: Returned with ' + result + ', code ' + code +
                      ' and error ' + error);
        }

        process.exit(0);
      });
    });

    grunt.initConfig({
        // Variables
        appDir: 'client/',
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * <%= pkg.homepage %>\n * Copyright (c) ' +
            '<%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
            ' Licensed <%= pkg.license %>\n */\n',

        // Task configuration
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= banner %>'
            },
            dist: {
                src: ['<%= bower.install.options.targetDir %>/js/**/*.js',
                      '<%= appDir %>js/*.js',
                      '<%= appDir %>js/**/*.js',
                      '!<%= appDir %>js/tests/**/*.js'],
                dest: '<%= appDir %>build/app.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= concat.dist.dest %>'
            }
        },

        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                undef: true,
                unused: false,
                eqnull: true,
                browser: true,
                globals: {
                  "_": true,
                  "angular": true,
                  "ace": true,
                  "describe": true,
                  "it": true,
                  "before": true,
                  "beforeEach": true,
                  "after": true,
                  "afterEach": true,
                  "expect": true,
                  "inject": true
                }
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib_test: {
                src: ['<%= appDir %>js/*.js', '<%= appDir %>js/**/*.js']

            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: "<%= appDir %>/sass/",
                    cssDir: "<%= appDir %>/build/css",
                    importPath: "<%= appDir %>bower"
                }
            },
            dist: {
                options: {
                    sassDir: '<%= compass.dev.options.sassDir %>',
                    cssDir: '<%= compass.dev.options.cssDir %>',
                    importPath: "<%= compass.dev.options.importPath %>",
                    environment: 'production'
                }
            }
        },

        watch: {
            javascript: {
                files: ['<%= jshint.gruntfile.src %>', '<%= jshint.lib_test.src %>'],
                tasks: ['jshint', 'concat'],
            },
            compass: {
                files: '<%= compass.dev.options.sassDir %>*.scss',
                tasks: ['compass:dev'],
            },
            livereload: {
                files: ['<%= appDir %>/build/**/*', '<%= appDir %>/build/*'],
                options: {
                    livereload: true
                }
            }
        },

        shell: {
          bowerInstall: {
            command: 'bower install',
          },
          postgres: {
            command: 'postgres -D /usr/local/var/postgres',
            options: {
              async: true,
            }
          },
          gunicorn: {
            command: 'gunicorn sovi.wsgi',
            options: {
              async: true,
              execOptions: {
                env: {'DJANGO_SETTINGS_MODULE':'sovi.settings'}
              }
            }
          },
          runServer: {
            command: 'python3 manage.py runserver',
            options: {
              async: true,
              execOptions: {
                env: {'DJANGO_SETTINGS_MODULE':'sovi.settings'}
              }
            }
          },
          makeBuildFolder: {
            command: 'mkdir -p <%= appDir %>build',
          },
          moveAce: {
            command: 'cd <%= bower.install.options.targetDir %>/js/ace-builds' +
                     ' && mv ./mode-python.js ../mode-python.js && ' +
                     'rm -f ext-* && rm -f mode-* && rm -rf snippets && ' +
                     'rm -f worker-* && mv ../mode-python.js ./mode-python.js'
          }, 
          moveFA: {
            command: 'mv <%= appDir %>bower/font-awesome/fonts' +
                     '   <%= appDir %>build/fonts',
          },
          copyPartials: {
            command: 'cp -r <%= appDir %>partials <%= appDir %>build/partials',
          },
          cleanBowerTemp: {
            command: 'rm -rf <%= bower.install.options.targetDir %>',
          },
          cleanBower: {
            command: 'rm -rf <%= bower.install.options.targetDir %> &&' +
                     'rm -rf <%= appDir %>bower'
          },
          cleanBuild: {
            command: 'rm -rf <%= appDir %>build',
          }
        },

        bower: {
          install: {
            options: {
              targetDir: '<%= appDir %>BOWER_TEMP',
            }
          }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-bower-task');

    // Tasks
    grunt.registerTask('default', ['shell:cleanBower', 'shell:cleanBuild',
                                   'jshint', 'shell:makeBuildFolder',
                                   'shell:copyPartials', 'shell:bowerInstall',
                                   'bower', 'shell:moveFA', 'shell:moveAce',
                                   'concat', 'uglify', 'compass:dist',
                                   'shell:cleanBowerTemp']);
    grunt.registerTask('serve', [/*'shell:cleanBower',*/ 'shell:cleanBuild',
                                 'jshint', 'shell:makeBuildFolder',
                                 'shell:copyPartials', //'shell:bowerInstall',
                                 'bower', 'shell:moveFA',
                                 'shell:moveAce', 'concat', 'compass:dev',
                                 'shell:postgres', 'shell:runServer', 'watch']);
};
