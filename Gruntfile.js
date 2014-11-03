'use strict';

module.exports = function(grunt) {

    //Project configuration
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        dirs : {
            src : 'src/',
            dest : 'dest/js/<%= pkg.version %>',
            destCss : 'dest/css/<%= pkg.version %>',
        },

        concat : {
            options : {
                //separator : ';',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                           '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            base : {
                src : ["<%= dirs.src %>/lib/js/jindo_2.8.1.js","<%= dirs.src %>/js/list_rf.js"] ,
                dest : '<%= dirs.dest %>/listPage.js',
                nonull : true,
            },
            mobile : {
                src : ["<%= dirs.src %>/lib/js/jindo_2.8.1.js","<%= dirs.src %>/js/list_m.js"] ,
                dest : '<%= dirs.dest %>/listPage_m.js',
                nonull : true,
            },

            cssIndex: {
                src : ["<%= dirs.src %>/lib/css/reset.css","<%= dirs.src %>/css/common.css", "<%= dirs.src %>/css/main.css"] ,
                dest : '<%= dirs.destCss %>/mainPage.css',
                nonull : true,
            },
            cssPost: {
                src : ["<%= dirs.src %>/lib/css/reset.css","<%= dirs.src %>/css/common.css", "<%= dirs.src %>/css/postLayout.css", "<%= dirs.src %>/css/syntax.css"] ,
                dest : '<%= dirs.destCss %>/postLayoutPage.css',
                nonull : true,
            },
            cssList : {
                src : ["<%= dirs.src %>/lib/css/reset.css","<%= dirs.src %>/css/common.css", "<%= dirs.src %>/css/list.css"] ,
                dest : '<%= dirs.destCss %>/listPage.css',
                nonull : true,
            },
            cssLecture : {
                src : ["<%= dirs.src %>/lib/css/reset.css","<%= dirs.src %>/css/common.css", "<%= dirs.src %>/css/lecture.css"] ,
                dest : '<%= dirs.destCss %>/lectureMain.css',
                nonull : true,
            },
            cssLectureEndPage : {
                src : ["<%= dirs.src %>/lib/css/reset.css","<%= dirs.src %>/css/common.css", "<%= dirs.src %>/css/lecture_endpage.css"] ,
                dest : '<%= dirs.destCss %>/lectureEndPage.css',
                nonull : true,
            },
            cssListMobile : {
                src : ["<%= dirs.src %>/lib/css/reset.css","<%= dirs.src %>/css/common.css", "<%= dirs.src %>/css/list_m.css"] ,
                dest : '<%= dirs.destCss %>/listPage_m.css',
                nonull : true,
            }
        },

        uglify : {
            my_target : {
                options : {
                    beautify : false,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                                '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                },
                files : {
                    '<%= dirs.dest %>/listPage_min_<%= pkg.version %>.js' : ['<%= dirs.dest%>/listPage.js'],
                    '<%= dirs.dest %>/listPage_m_min_<%= pkg.version %>.js' : ['<%= dirs.dest%>/listPage_m.js'],
                    // '<%= dirs.dest %>/lecture/view_min_<%= pkg.version %>.js' : ['<%= dirs.src%>/js/lecture/view.js'],
                }
            }
        }
    });


    //Load
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Default Task(s)
    grunt.registerTask('default' , ['concat','uglify']);

    //grunt.registerTask('mc' , ['concat']);
};
