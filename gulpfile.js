const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


// Compile Sass & Inject Into browser
gulp.task('sass', function() {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});



// Move JS Files to src/js

gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquerydist/dist/jquery.min.js', 'node_modules/propper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});


// Watch Sass and Servers
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scsss'], ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});


// MOVE fonts folder to browserSync
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/css"));
});

//Move awesome

gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['js','serve','fa', 'fonts']);
