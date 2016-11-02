var gulp = require('gulp');
var sass = require('gulp-ruby-sass')
var notify = require("gulp-notify")
var bower = require('gulp-bower');
var webpack = require('webpack-stream');
var del = require('del');
var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
};

gulp.task('clean:dist', function(){
    return del([
        './dist/**/*'
    ]);
});

gulp.task('copyhtml', ['clean:dist'], function(){
    return gulp.src('index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('makeSassAndCopy', ['sass'], function(){
    return gulp.src('./css/style.css')
        .pipe(gulp.dest('dist/'));
});

gulp.task('webpack', function(){
    return gulp.src('src/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', ['clean:dist'],function() {
    return sass('./resources/sass/style.scss',{
            style: 'compressed',
            loadPath: [
                './bower_components/bootstrap-sass/assets/stylesheets',
                './bower_components/font-awesome/scss',
            ],
        })
        .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('icons', ['clean:dist'], function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./fonts'));
});

gulp.task('default', ['icons','makeSassAndCopy', 'copyhtml', 'webpack']);