var gulp = require('gulp');

var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
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
    var main = gulp.src('app/pre-scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('../maps/css/'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));


    return merge(main);

});

gulp.task('images', function () {
    gulp.src('app/img/*')
       .pipe(imagemin())
      .pipe(gulp.dest('dist/img/'));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
        },
        port:8080,
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
         .pipe(sourcemaps.init({ loadMaps: true }))
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
        .pipe(sourcemaps.write('../maps/js'))
       .pipe(gulp.dest('dist/js/'))
       .pipe(browserSync.reload({ stream: true }));

    var customs = gulp.src('app/pre-js/include/custom/*.js')
           .pipe(sourcemaps.init({ loadMaps: true }))
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
       .pipe(sourcemaps.write('../maps/js'))
       .pipe(gulp.dest('dist/js/'))
       .pipe(browserSync.reload({ stream: true }));

    return merge(vendors, plugin, customs);

});

gulp.task('pages', function () {
    gulp.src('app/*.html')
        .pipe(plumber({
            errorHandler: function (error) {
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
    gulp.watch('app/pre-js/include/**/*.js', ['scripts']);
    gulp.watch('app/**/*.html', ['pages']);
    gulp.watch('dist/*.html', ['bs-reload']);
    gulp.watch('app/img/*', ['images']);

});