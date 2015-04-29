var gulp       = require('gulp');
var babel      = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');
var gulpif     = require('gulp-if');

var debug = false;

gulp.task('es6', function () {
    gulp.src('src/bem.js')
        .pipe(gulpif(debug, sourcemaps.init()))
            .pipe(babel())
            .pipe(uglify())
        .pipe(gulpif(debug, sourcemaps.write()))
        .pipe(gulp.dest('dist/'))
});

gulp.task('dev', function () {
    debug = true;
    gulp.watch('src/bem.js', ['es6']);
});
