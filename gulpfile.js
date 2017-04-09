var gulp = require('gulp');

var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var csswring = require("csswring");
var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('styles', function () {
    var processors = [
        autoprefixer,
        cssnano
        //csswring
    ];
    var bootstraps = gulp.src('app/pre-scss/bootstrap.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));

    var main = gulp.src('app/pre-scss/*.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));


    return merge(bootstraps, main);

});

gulp.task('images', function () {
    gulp.src('app/img/*')
       .pipe(imagemin())
      .pipe(gulp.dest('dist/img/'));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        ghostMode: {
            scroll: true
        }
    });
});

gulp.task('scripts', function () {
    var vendors = gulp.src('app/pre-js/include/vendor/*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({ stream: true }));

    var plugin = gulp.src('app/pre-js/include/plugin/*.js')
       .pipe(plumber({
           errorHandler: function (error) {
               console.log(error.message);
               this.emit('end');
           }
       }))
       .pipe(concat('plugins.js'))
       .pipe(gulp.dest('dist/js/'))
       .pipe(rename({ suffix: '.min' }))
       .pipe(uglify())
       .pipe(gulp.dest('dist/js/'))
       .pipe(browserSync.reload({ stream: true }));

    var customs = gulp.src('app/pre-js/include/custom/*.js')
       .pipe(plumber({
           errorHandler: function (error) {
               console.log(error.message);
               this.emit('end');
           }
       }))
       .pipe(concat('customs.js'))
       .pipe(gulp.dest('dist/js/'))
       .pipe(rename({ suffix: '.min' }))
       .pipe(uglify())
       .pipe(gulp.dest('dist/js/'))
       .pipe(browserSync.reload({ stream: true }));

    return merge(vendors, plugin, customs);

});

gulp.task('pages', function() {
    gulp.src('app/*.html')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('app/pre-scss/**/*.scss', ['styles']);
    gulp.watch('dist/*.html', ['bs-reload']);
    gulp.watch('app/**/*.html', ['pages']);
    gulp.watch('app/img/*', ['images']);
    gulp.watch('app/pre-js/include/**/*.js', ['scripts']);
});