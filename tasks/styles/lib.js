'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const notify = require('gulp-notify');
var cssimport = require("gulp-cssimport");
var cleanCSS = require('gulp-clean-css');


module.exports = function(options) {
  return function() {
    // return options;
    return gulp.src(options.src)
      .pipe(stylus({
        'include css': true
      }))
      .on('error', notify.onError(function (err) {
        return {
          title: 'Stylus',
          message: err.message
        };
      }))
      .pipe(cssimport())
      .pipe(cleanCSS())
      .pipe(gulp.dest(options.dest));

  };
};
