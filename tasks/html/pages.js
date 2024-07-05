'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const htmlPrettify = require('gulp-html-prettify');
const rename = require("gulp-rename");

var condition = function (file) {
  return file.basename !== 'index.html';
}

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
      .pipe(gulpif(condition, rename(function (path) {
        // Updates the object in-place
          path.dirname += '/' + path.basename;
          path.basename = "index";
          path.extname = ".html";
      })))
      .pipe(gulp.dest(options.dest));
  };
};
