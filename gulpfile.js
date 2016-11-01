var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('copyhtml', function(){
    return gulp.src('index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('webpack', function(){
    return gulp.src('src/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['copyhtml', 'webpack']);