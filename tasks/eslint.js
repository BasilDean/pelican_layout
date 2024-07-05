'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

module.exports = function(options) {
// TODO fix linter config
  return function() {
    return gulp.src(options.src)
      .pipe(eslint({
        rules:{
          "camelcase": 1,
          "comma-dangle": 2,
          "quotes": 0
        },
        globals: [
          'jQuery',
          '$'
        ],
        envs: [
          'browser'
        ]
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  };
};
