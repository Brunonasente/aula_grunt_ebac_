module.exports = function(grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css' : 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css' : 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'], 
                tasks: ['less:development'] // tarefa serial, primeiro o development e depois o production
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'  //Aonde esta claro que este arquivo vai ser pego na pastra src? porque ele é o ambiente de dev?
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'  //Aonde esta claro que este arquivo vai ser pego na pastra src? porque ele é o ambiente de dev?
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'  //Aonde esta claro que este arquivo vai ser pego na pastra src? porque ele é o ambiente de dev?
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html' : 'src/index.html'  //damos o comando npm run grunt htmlmin:dist assim é criado a pré pasta "prebuild" com o html minificado
                }
            }
        },
        clean: ['prebuild']       
    })
    


    grunt.loadNpmTasks('grunt-contrib-less');  //instalações de plugins
    grunt.loadNpmTasks('grunt-contrib-watch');    
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    

    grunt.registerTask('default',['watch']); // tarefa, a ser executada por npm run grunt
    grunt.registerTask('build',['less:production', 'htmlmin:dist', 'replace:dist', 'clean']);

    


}