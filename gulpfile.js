/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var notify = require("gulp-notify");
var concat = require('gulp-concat');
var ngAnnotate = require("browserify-ngannotate");
var uglify = require("gulp-uglify");
var streamify = require("gulp-streamify");

var scriptsDir = './app';
var buildDir = './public';

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file, watch, minify) {
    
    minify = minify || false;
    
    var props = {entries: [scriptsDir + '/' + file], debug: true, cache: {}, packageCache: {}};
    var bundler = watch ? watchify(browserify(props)) : browserify(props);
    bundler.transform(ngAnnotate);
    function rebundle() {
        var stream = bundler.bundle({debug: true});
        if(minify){
            return stream.on('error', handleErrors)
                .pipe(source(file))
                .pipe(streamify(uglify()))
                .pipe(gulp.dest(buildDir + '/'));
        } else {
            return stream.on('error', handleErrors)
                .pipe(source(file))
                .pipe(gulp.dest(buildDir + '/'));
        }
        
    }
    bundler.on('update', function () {
        rebundle();
        gutil.log('Rebundle...');
    });
    return rebundle();
}

gulp.task('build', function () {
    return buildScript('main.js', false, true);
});

gulp.task('default', ['build'], function () {
    return buildScript('main.js', true);
});

gulp.task('client-css', function () {
    gulp.src([
        'node_modules/angular-material/angular-material.min.css'
    ])
        .pipe(concat('style.css'))
        .pipe(gulp.dest(buildDir));

});