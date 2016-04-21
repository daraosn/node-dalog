var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
 
gulp.task('default', function() {
  return gulp.src('src/*.js')
    .pipe(watch('src/*.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('dist'));
});