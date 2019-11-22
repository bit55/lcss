'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const connect = require('gulp-connect');

gulp.paths = {
    src: 'src',
    dist: 'dist',
};

var paths = gulp.paths;

gulp.task('sass', function () {
    return gulp.src(paths.src+'/main.scss')
        .pipe(sass())
        .pipe(csso({
            restructure: true,
            sourceMap: false,
            debug: false
        }))
        .pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('clean:dist', function () {
    return del([paths.dist+'/webfonts', paths.dist+'/fonts', paths.dist+'/css', paths.dist+'/js']);
});


gulp.task('copy:webfonts-fa5', function() {
    return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
        .pipe(gulp.dest(paths.dist+'/webfonts'));
});
gulp.task('copy:webfonts-fa5css', function() {
    return gulp.src('./node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css')
        .pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('copy:webfonts', gulp.parallel('copy:webfonts-fa5', 'copy:webfonts-fa5css'));

gulp.task('copy:css', function() {
    return gulp.src(paths.src+'/css/**/*')
        .pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('scripts', function() {
    return gulp.src([
            //paths.src+'/js/tablednd.js',
            paths.src+'/js/common.js',
            
        ])
        .pipe(concat('common.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(paths.dist+'/js'));
});

gulp.task('jquery', function() {
    return gulp.src([
            './node_modules/jquery/dist/jquery.min.js',          
        ])
        .pipe(gulp.dest(paths.dist+'/js'));
});


gulp.task('copy:js', function() {
    return gulp.src([
        './node_modules/bootstrap/js/dist/dropdown.js',
        './node_modules/bootstrap/js/dist/tooltip.js',
    ])
    .pipe(webpack({
        mode: 'production',
        externals: {
          jquery: 'jQuery'
        },
        output: {
          filename: 'bundle.js',
        },
    }))
    .pipe(gulp.dest(paths.dist+'/js'));
});

gulp.task('build', 
    gulp.series('clean:dist', gulp.parallel('sass', 'copy:webfonts', 'copy:js', 'scripts', 'jquery', 'copy:css'))
);

gulp.task('watch', function(callback) {
    gulp.watch(paths.src+'/**/*.*', gulp.parallel('build'));
    // gulp.watch(paths.src+'/**/*.scss', function(callback) {
        // runSequence('sass', 'postcss', callback);
    // });
});

gulp.task('default', gulp.parallel('watch'));
//gulp.task('serve', serve(['dist', 'example']));

gulp.task('serve', function () {
  connect.server({
    root: ['dist', 'example'],
    port: 3000,
    livereload: false
  });
});

var webserver = require('gulp-webserver');
 
gulp.task('webserver', function() {
  gulp.src(['dist', 'example'])
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});