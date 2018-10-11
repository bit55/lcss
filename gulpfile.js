'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.paths = {
    dist: 'dist',
};

var paths = gulp.paths;

gulp.task('sass', function () {
    return gulp.src('./src/main.scss')
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

gulp.task('copy:webfonts', ['copy:webfonts-fa4', 'copy:webfonts-fa4css']);
//gulp.task('copy:webfonts', ['copy:webfonts-fa5', 'copy:webfonts-fa5css']);

gulp.task('copy:webfonts-fa4', function() {
   return gulp.src('./src/font-awesome-4.7.0/fonts/**/*')
   .pipe(gulp.dest(paths.dist+'/fonts'));
});
gulp.task('copy:webfonts-fa4css', function() {
   return gulp.src('./src/font-awesome-4.7.0/css/font-awesome.min.css')
   .pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('copy:webfonts-fa5', function() {
   return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
   .pipe(gulp.dest(paths.dist+'/webfonts'));
});
gulp.task('copy:webfonts-fa5css', function() {
   return gulp.src('./node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css')
   .pipe(gulp.dest(paths.dist+'/css'));
});


gulp.task('copy:css', function() {
   return gulp.src('./src/css/**/*')
   .pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('scripts', function() {
  return gulp.src([
        //'./node_modules/jquery/dist/jquery.min.js', 
        './src/js/common.js'
    ])
    .pipe(concat('common.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist+'/js'));
});

const webpack = require('webpack-stream');

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

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['sass', 'copy:webfonts', 'copy:js', 'scripts', 'copy:css'], callback); 
});

gulp.task('watch', function(callback) {
    gulp.watch('./src/**/*.*', ['build']);
    // gulp.watch('./src/**/*.scss', function(callback) {
        // runSequence('sass', 'postcss', callback);
    // });
});

gulp.task('default', ['watch']);
