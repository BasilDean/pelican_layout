const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite-plus');

const config = {
  shape: {
    dimension: { // Dimension related options
      maxWidth: 35, // Max. shape width
      maxHeight: 35, // Max. shape height
      precision: 2, // Floating point precision
      attributes: false, // Width and height attributes on embedded shapes
    },
    spacing: { // Spacing related options
      padding: 0, // Padding around all shapes
      box: 'content' // Padding strategy (similar to CSS `box-sizing`)
    },
    dest: 'out/intermediate-svg' // Keep the intermediate files
  },
  mode: {
    stack: {
      sprite: "../sprite.svg"  //sprite file name
    }
  },
};

module.exports = function(options) {
  return function() {
    return gulp.src(options.src)
      .pipe(svgSprite(config))
      .pipe(gulp.dest(options.dest));
  }
}
