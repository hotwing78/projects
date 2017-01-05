'use strict'
let gulp = require('gulp');
let sass = require('gulp-sass')

gulp.task('default',['html','css','js']);

gulp.task('html',function(){
  return gulp.src('./index.html')
  .pipe(gulp.dest('./public'));
});

gulp.task('css',function(){
  return gulp.src('./scss/styles.scss')
      .pipe(sass())
      .pipe(gulp.dest('./public/css'));
});

gulp.task('js',function(){
  return gulp.src('./js/app.js')
      .pipe(gulp.dest('./public/js'))
});

gulp.task('watch', function(){
     gulp.watch('./js/*.js', ['js']);
     gulp.watch('./scss/*.scss', ['css']);
     gulp.watch('./index.html', ['html'])
});
