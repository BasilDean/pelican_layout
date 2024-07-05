'use strict';
const gulp = require('gulp');
function lazeRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function (callback) {
    let task = require(path).call(this, options);
    return task(callback);
  });
}
lazeRequireTask('clean', './tasks/clean', {
  src: 'build'
});
lazeRequireTask('styles-main', './tasks/styles/main', {
  src: 'dev/styles/styles.styl',
  dest: 'build/assets/css',
});
lazeRequireTask('styles-pages', './tasks/styles/pages', {
  src: 'dev/styles/pages/**/*.styl',
  dest: 'build',
});
lazeRequireTask('styles-components', './tasks/styles/components', {
  src: 'dev/styles/components/**/*.styl',
  dest: 'build/components',
})
lazeRequireTask('styles-lib', './tasks/styles/lib', {
  src: 'dev/styles/libraries/**/*.styl',
  dest: 'build/assets/libs/js',
})
gulp.task('styles', gulp.series(
  'styles-main',
  'styles-pages',
  'styles-components',
  'styles-lib',
));
lazeRequireTask('scripts-main', './tasks/scripts/main', {
  src: 'dev/scripts/common.js',
  dest: 'build/assets/js',
});
lazeRequireTask('scripts-components', './tasks/scripts/components', {
  src: 'dev/scripts/components/**/*.js',
  dest: 'build/components',
})
lazeRequireTask('scripts-lib', './tasks/scripts/lib', {
  src: 'dev/scripts/libraries/**/*.js',
  dest: 'build/assets/libs/css',
})
gulp.task('scripts', gulp.series(
  'scripts-main',
  'scripts-lib',
  'scripts-components',
));
lazeRequireTask('html-components', './tasks/html/components', {
  src: 'dev/pug/components/**/*.pug',
  dest: 'build/components',
  taskName: 'pug'
});
lazeRequireTask('pages', './tasks/html/pages', {
  src: 'dev/pug/pages/**/*.pug',
  dest: 'build',
  taskName: 'pages'
});
gulp.task('html', gulp.series(
  'html-components',
  'pages',
));
// TODO make pages to import partials by default
gulp.task('components', gulp.series(
  'scripts-components',
  'styles-components',
  'html-components',
));
lazeRequireTask('sprite', './tasks/sprite', {
  src: 'dev/svg/**.svg',
  dest: 'build/assets/images/icons',
});
lazeRequireTask('server', './tasks/server', {
  src: 'build/',
  baseDir: './',
  watch: 'build/**/*.*'
});
lazeRequireTask('copy:images', './tasks/copy', {
  src: 'dev/images/**/**.*',
  dest: 'build/assets/images',
  taskName: 'copy:images'
});
// TODO fix a task to copy images and probably add optimization
lazeRequireTask('copy:fonts', './tasks/copy', {
  src: 'dev/fonts/**',
  dest: 'dev/assets/fonts',
  taskName: 'copy:fonts'
});
gulp.task('watch', function() {
  gulp.watch('dev/styles/**/*.*', gulp.series('styles'));
  gulp.watch('dev/pug/**/*.pug', gulp.series('html'));
  gulp.watch('dev/scripts/**/*.js', gulp.series('scripts'));
  gulp.watch('dev/fonts/**/*.*', gulp.series('copy:fonts'));
  gulp.watch('dev/images/**/*.*', gulp.series('copy:images'));
  gulp.watch('dev/svg/**/*.*', gulp.series('sprite'));
});
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('styles', 'scripts'),
  'html',
  gulp.parallel('copy:fonts', 'copy:images'),
  'sprite'
));
gulp.task('dev', gulp.series(
  'build',
  gulp.parallel('watch', 'server')
));
// TODO make separate build for dev version
lazeRequireTask('eslint', './tasks/eslint', {
  src: 'dev/scripts/**/*.js'
});
gulp.task('default', gulp.series(
  'build',
  'eslint',
  gulp.parallel('watch', 'server')
));
// TODO separate dev and production builds
