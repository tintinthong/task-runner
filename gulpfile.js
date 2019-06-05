var gulp = require('gulp');
var browserSync = require('browser-sync')
  .create();
var sass = require('gulp-sass');
 var googleWebFonts = require('gulp-google-webfonts');
// -------------------------------------------
// Fonts options
var options = {
  fontsDir: '../fonts/',
  cssDir: '../css/',
  cssFilename: 'fonts.css'
};

gulp.task('fonts', function () {
  return gulp.src('./fonts.list')
    .pipe(googleWebFonts(options))
    .pipe(gulp.dest('app/assets/fonts'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: "./app"
  });
  gulp.watch("app/styles/*.scss", ['sass']);
  gulp.watch("app/*.html")
    .on('change', browserSync.reload);
});
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("app/styles/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/assets/css"))
    .pipe(browserSync.stream());
});
gulp.task('default', ['serve']);
