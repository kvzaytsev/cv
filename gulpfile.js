const gulp    = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');

const mixins            = require('postcss-mixins');
const partialImport     = require('postcss-partial-import');
const advancedVariables = require('postcss-advanced-variables');

gulp.task('styles', () => gulp
  .src('postcss/index.css')
  .pipe(postcss([
    partialImport(),
    advancedVariables(),
    mixins()
  ]))
  .pipe(gulp.dest('./'))
);

gulp.task('build', gulp.series('styles'));
