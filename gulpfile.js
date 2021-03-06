var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps');

livereload({start: true});

gulp.task('clean', function(cb) {
  del(['./public/js', './public/images', './public/stylesheets'], cb);
});

gulp.task('styles', function() {
  return sass('./assets/stylesheets/style.scss', {style: 'expanded'})
  .pipe(autoprefixer('last 2 version'))
  .pipe(gulp.dest('./public/stylesheets'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('./public/stylesheets'))
  .pipe(notify({message: 'Styles tasks are complete'}));
});

gulp.task('scripts', function() {
  return gulp.src('./assets/js/**/*.js')
  // .pipe(jshint('.jshintrc'))
  // .pipe(jshint.reporter('default'))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('./public/js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('images', function() {
  return gulp.src('./assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./public/images'))
    .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  gulp.watch('./assets/stylesheets/**/*.scss', ['styles']);
  gulp.watch('./assets/images/**/*', ['images']);
  gulp.watch('./assets/js/**/*.js', ['scripts']);
  livereload.listen();
  gulp.watch(['./assets/**']).on('change', livereload.changed);
});
