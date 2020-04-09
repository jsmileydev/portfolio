const gulp = require('gulp');
const { src, dest, watch, series } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
sass.compiler = require('node-sass');


const files = {
    scssPath: './app/scss/*.scss',
    cssPath: './dist/css/concat.css'
};

/*function mergeTask() {

	var scssStream = gulp
        .src( files.scssPath )
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(concat('/dist/scss-files.scss'))
    ;

    var cssStream = gulp.src( './dist/scss-files.scss' )
        .pipe(concat('/dist/css/css-files.css'))
    ;

    var mergedStream = merge(scssStream, cssStream)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('/dist'))
    ;

    return mergedStream;
}*/

function scss() {

    return gulp.src('./app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./app/css'));

}

function css() {
    
    return gulp.src('./app/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(concatCss('styles.css'))
        .pipe(dest('./dist'))

}

exports.default = function() {
    watch('./app/scss/*.scss', series(scss, css));
};