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

gulp.task('clean:css', function(){
    return del([
        './css/**/*'
    ]);
});

gulp.task('copyres', ['clean:dist'], function(){
    return gulp.src([
        './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        './resources/lodash/lodash.min.js'
        ]).pipe(gulp.dest('dist/res/'));
})

/* mulitple copy example
gulp.task('copyres', ['clean:dist'], function(){
    return gulp.src([
        './bower_components/fds-browser-api/fds-browser-api.js',
        './bower_components/fds-user-angular/fds-user-angular.min.js',
        './bower_components/bandit-components/dist/audit/audit.js',
        './bower_components/bandit-components/dist/entity_info/entity_info.js',
        './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        './bower_components/file-select/dist/file-select.min.js',
        ]).pipe(gulp.dest('dist/res/'));
})
*/
gulp.task('copyhtml', ['clean:dist'], function(){
    return gulp.src('index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copygridstack27', ['clean:dist'], function(){
    return gulp.src('./resources/gridstack27/*.*')
        .pipe(gulp.dest('dist/'));
});

gulp.task('makeSassAndCopy', ['sass', 'sass-style-overrides'], function(){
    return gulp.src('./css/*.*')
        .pipe(gulp.dest('dist/'));
});


gulp.task('webpack', function(){
    return gulp.src('src/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', ['clean:dist', 'clean:css'],function() {
    return sass('./resources/sass/style.scss',{
            style: 'compressed',
            loadPath: [
                './bower_components/bootstrap-sass/assets/stylesheets',
                './bower_components/font-awesome/scss',
            ],
        })
        .on('error', notify.onError(function (error) {
                return 'Error: ' + error.message;
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass-style-overrides', ['clean:dist', 'clean:css'], function(){
    return sass('./resources/sass/style-overrides.scss', {
        style: 'compressed',

    }).on('error', notify.onError(function(error){
        return 'Error: '+erro.message;
    })).pipe(gulp.dest('./css'));
});

gulp.task('icons', ['clean:dist'], function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('watch', function(){
    gulp.watch('src/**/*.vue', ['default']);
    gulp.watch('src/**/*.js', ['default']);
    gulp.watch('resources/**/*.scss', ['default']);
});

gulp.task('default', ['icons','makeSassAndCopy', 'copyres', 'copyhtml','copygridstack27', 'webpack']);