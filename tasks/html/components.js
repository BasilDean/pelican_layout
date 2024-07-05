'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const notify = require('gulp-notify');
const htmlPrettify = require('gulp-html-prettify');
const rename = require("gulp-rename");

module.exports = function(options) {

  return function() {
    return gulp.src(options.src)
      .pipe(pug())
      .on('error', notify.onError(function (err) {
        return {
          title: 'Pug',
          message: err.message
        };
      }))
      .pipe(htmlPrettify({
        indent_char: ' ',
        indent_size: 4
      }))
      .pipe(rename(function (path) {
        // Updates the object in-place
        path.dirname += '/' + path.basename;
        path.basename = "template";
        path.extname = ".php";
      }))
      .pipe(gulp.dest(options.dest));
  };
};
