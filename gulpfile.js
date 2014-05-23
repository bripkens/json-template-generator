var closureCompiler = require('gulp-closure-compiler');
var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var pkg = require('./package.json');

gulp.task('compile', function() {
  return gulp.src('lib/**/*.js')

    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))

    .pipe(concat(pkg.name + '.js'))

    .pipe(gulp.dest('dist'))

    .pipe(closureCompiler({
      compilerPath: 'compiler-latest/compiler.jar',
      fileName: pkg.name + '.min.js',
      compilerFlags: {
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        warning_level: 'VERBOSE',
        language_in: 'ECMASCRIPT5_STRICT',
        output_wrapper: '(function(){%output%})();',
        externs: ['externs.js']
      }
    }))

    .pipe(gulp.dest('dist'));
});

gulp.task('test', ['compile'], function() {
  return gulp.src('test/**/*.test.js')
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['compile', 'test']);
