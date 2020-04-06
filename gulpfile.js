const gulp = require('gulp');
const { src, dest, watch, series } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify-css');
const merge = require('merge-stream');
//const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
sass.compiler = require('node-sass');


const files = {
    scssPath: './app/style.scss',
    cssPath: './dist/style.css'
};

function mergeTask() {

	var scssStream = gulp
        .src( files.scssPath )
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(concat('scss-files.scss'))
    ;

    var cssStream = gulp.src( files.cssPath )
        .pipe(concat('css-files.css'))
    ;

    var mergedStream = merge(scssStream, cssStream)
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('dist/css'))
    ;

    return mergedStream;
}

exports.default = function() {
    watch('./app/*.scss', mergeTask);
};