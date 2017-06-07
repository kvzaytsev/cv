const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');

const mixins = require('postcss-mixins');
const partialImport = require('postcss-partial-import');
const advancedVariables = require('postcss-advanced-variables');

const contentModel = require('./model');

gulp.task('styles', () => gulp
    .src('postcss/index.css')
    .pipe(plumber())
    .pipe(postcss([
        partialImport(),
        advancedVariables(),
        mixins()
    ]))
    .pipe(gulp.dest('./'))
);

gulp.task('html', () => gulp
    .src('templates/index.ejs')
    .pipe(plumber())
    .pipe(ejs(contentModel))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
);


gulp.task('build', gulp.series('styles', 'html'));

gulp.watch('postcss/**/*.css', gulp.series('styles'));
gulp.watch('templates/**/*.ejs', gulp.series('html'));
