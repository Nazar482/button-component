'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    plumber = require('gulp-plumber'),
    browserSync = require("browser-sync"),
    pug = require('gulp-pug'),
    reload = browserSync.reload;


// Paths
var path = {
    build: { 
        pug: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { 
        pug: 'src/templates/*.pug',
        js: 'src/js/main.js', 
        sass: 'src/scss/main.scss',
        img: 'src/img/**/*.*', 
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        pug: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        sass: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

// Dev server
var config = {
    server: {
        baseDir: "./build",
        index: "index.html"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "dev_server"

};

//Jade build
gulp.task('pug:build', function() {
    gulp.src(path.src.pug)
        .pipe(pug({
            pretty: true
        }))
        .pipe(plumber())
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.pug)) 
        .pipe(reload({stream: true})); 
});

//Javascript build
gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(plumber())
        .pipe(rigger()) 
        .pipe(uglify()) 
        .pipe(gulp.dest(path.build.js)) 
        .pipe(reload({stream: true})); 
});

//Sass build
gulp.task('sass:build', function () {
    gulp.src(path.src.sass) 
        .pipe(plumber())
        .pipe(sass()) 
        .pipe(prefixer()) 
        .pipe(cssmin()) 
        .pipe(gulp.dest(path.build.css)) 
        .pipe(reload({stream: true}));
});

//Images build
gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(plumber())
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) 
        .pipe(reload({stream: true}));
});

//Fonts build
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
});

//Build for all
gulp.task('build', [
    'pug:build',
    'js:build',
    'sass:build',
    'fonts:build',
    'image:build'
]);

//Gulp watcher
gulp.task('watch', function(){
    watch([path.watch.pug], function(event, cb) {
        gulp.start('pug:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

//Livereload server
gulp.task('webserver', function () {
    browserSync(config);
});

//Cleaner
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

//Default task
gulp.task('default', ['build', 'webserver', 'watch']);
