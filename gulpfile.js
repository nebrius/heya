/*
The MIT License (MIT)

Copyright (c) 2014 Bryan Hughes <bryan@theoreticalideations.com> (http://theoreticalideations.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var find = require('find');
var async = require('async');
var spawn = require('child_process').spawn;

gulp.task('default', ['js', 'html', 'clean']);

gulp.task('js', ['clean'], function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(babel({
        modules: 'common'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('lib'));
});

gulp.task('html', ['clean'], function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('lib'));
});

gulp.task('clean', function(cb) {
  del(['lib'], cb);
});

gulp.task('lint', function(cb) {
  find.file(/\.js$/, 'src', function(files) {
    var lintTasks = files.map(function (file) {
      return function(next) {
        spawn('eslint', [file], {
          stdio: 'inherit'
        }).on('close', next);
      }
    });
    async.parallel(lintTasks, cb);
  });
});