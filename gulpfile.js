var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync');

gulp.task('browserSync',['styles','html','script'],function () {
    browserSync.init({
       server: {
          baseDir: './build'
       },
        notify: false
    })
});

gulp.task('styles',function () {
         gulp.src('./src/styles/main.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(minifycss())
            .pipe(gulp.dest('build/style'))
});

gulp.task('html',function () {
        gulp.src('./src/**/*.html')
           .pipe(htmlmin({collapseWhitespace: true}))
           .pipe(gulp.dest('build'))
});

gulp.task('script',function () {
        gulp.src(['./src/js/main.js', './src/js/**/*.js'])
           .pipe(concat('app.js'))
           // .pipe(uglify())
           .pipe(gulp.dest('build/js'))
});

gulp.task('libs',function () {
        gulp.src('./src/libs/**/*')
            .pipe(gulp.dest('build/libs'))
});

gulp.task('watch',function () {
   gulp.watch('./src/styles/**/*.scss',['styles']);
   gulp.watch('./src/templates/**/*.html',['html']);
   gulp.watch('./src/index.html',['html']);
   gulp.watch('./src/js/**/*.js',['script']);
});

gulp.task('default',['browserSync','watch','libs']);