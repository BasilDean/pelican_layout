'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
var data = require('gulp-data');
const stylus = require('gulp-stylus');
const gcmq = require('gulp-group-css-media-queries');
const pkg = require('../../package.json');
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const notify = require('gulp-notify');
const stylint = require('gulp-stylint');
const rename = require("gulp-rename");

var condition = function (file) {
  return file.basename !== 'index.css';
}

module.exports = function(options) {
  return function() {
    // return options;
    return gulp.src(options.src)
      .pipe(stylint())
      .pipe(stylint.reporter())
      .pipe(data(function(file){
        return {
          componentPath: '/' + (file.path.replace(file.base, '').replace(/\/[^\/]*$/, ''))
        };
      }))
      .pipe(stylus())
      .on('error', notify.onError(function (err) {
        return {
          title: 'Stylus',
          message: err.message
        };
      }))
      .pipe(postcss([ autoprefixer({overrideBrowserslist: [
          'Android >= ' + pkg.browsers.android,
          'Chrome >= ' + pkg.browsers.chrome,
          'Firefox >= ' + pkg.browsers.firefox,
          'Explorer >= ' + pkg.browsers.ie,
          'iOS >= ' + pkg.browsers.ios,
          'Opera >= ' + pkg.browsers.opera,
          'Safari >= ' + pkg.browsers.safari
        ]}) ]))
      .pipe(gcmq())
      .pipe(gulpif(condition, rename(function (path) {
        // Updates the object in-place
        path.dirname += '/' + path.basename;
        path.basename = "style";
        path.extname = ".css";
      })))
      .pipe(gulp.dest(options.dest));

  };
};
