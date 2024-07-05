'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

module.exports = function(options) {

  return function() {
    return gulp.src(options.src)
      .pipe(eslint({
        "rules":{
          "camelcase": 1,
          "comma-dangle": 2,
          "quotes": 0
        }
      }))
      // TODO need to create correct config for the linter
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
      .pipe(gulp.dest(options.dest))
  };
};
