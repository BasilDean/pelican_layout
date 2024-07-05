'use strict';

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const browserify = require('gulp-browserify');

module.exports = function(options) {
  return function() {
    return gulp.src(options.src)
      .pipe(webpackStream(webpackConfig))
      // .pipe(browserify({
      //   insertGlobals : false,
      //   debug : false
      // }))
      .pipe(gulp.dest(options.dest))
  };
};
