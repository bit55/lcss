'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
var postcss = require('gulp-postcss');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');

gulp.paths = {
    dist: 'dist',
};

var paths = gulp.paths;

gulp.task('sass', function () {
    return gulp.src('./src/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('clean:dist', function () {
    return del([paths.dist+'/fonts', paths.dist+'/css', paths.dist+'/js']);
});

gulp.task('copy:fonts', function() {
   return gulp.src('./src/fonts/**/*')
   .pipe(gulp.dest(paths.dist+'/fonts'));
});

gulp.task('copy:css', function() {
   return gulp.src('./src/css/**/*')
   .pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('postcss', function () {
    var contextOptions = { modules: true };
    return gulp.src(paths.dist+'/css/*.css')
        .pipe(csscomb())
        .pipe(postcss(contextOptions))
        .pipe(csso({
            restructure: true,
            sourceMap: false,
            debug: false
        }))
        .pipe(gulp.dest(paths.dist+'/css'));
});


gulp.task('copy:js', function() {
   return gulp.src('./src/js/**/*')
   .pipe(gulp.dest(paths.dist+'/js'));
});

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['sass', 'copy:fonts', 'copy:js', 'copy:css'], 'postcss', callback);
});

gulp.task('watch', function(callback) {
    //gulp.watch('./src/**/*.scss', ['build']);
    gulp.watch('./src/**/*.scss', function(callback) {
        runSequence('sass', 'postcss', callback);
    });
});

gulp.task('default', ['watch']);
