'use strict';

var gulp = require('gulp')
var del = require('del')
var eslint = require('gulp-eslint')
var changed = require('gulp-changed')
var babel = require('gulp-babel')
var livereload = require('gulp-livereload')
var browserify = require('browserify')
var watchify = require('watchify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var gutil = require('gulp-util')
var stylus = require('gulp-stylus')
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('autoprefixer-core')

var paths = {
    transpile: ['src/server/**/*.js'],
    css: ['src/web/css/chat-backbone.styl'],
    static: ['src/web/index.html', 'src/web/static/**']
}

gulp.task('transpile', function () {
    return gulp
        .src(paths.transpile, {
            base: 'src'
        })
        .pipe(changed('dist'))
        .pipe(babel({
            sourceMaps: true
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task('css', function () {
    return gulp
        .src(paths.css, {
            base: 'src/web'
        })
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/web/static'))
        .pipe(livereload())
})

gulp.task('static', function () {
    return gulp
        .src(paths.static, {
            base: 'src'
        })
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
})

gulp.task('watchify', function () {

    var entry = './src/web/chat-backbone.jsx',
        props = {
            cache: {},
            packageCache: {},
            debug: true
        }

    var bundler = watchify(browserify(entry, props)
        .transform('babelify', {
            sourceMaps: true
        }))

    function bundle() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('chat-backbone.js'))
            .pipe(buffer())
            .pipe(gulp.dest('dist/web/static'))
    }

    bundler.on('update', bundle)

    bundler.on('bytes', function () {
        livereload.reload()
    })

    bundler.on('log', gutil.log)
    bundler.on('error', gutil.log)

    return bundle()
})

gulp.task('clean', function () {
    del.sync('dist')
})

gulp.task('default', ['transpile', 'css', 'static', 'watchify'], function () {

    livereload({
        start: true
    })

    gulp.watch(paths.transpile, ['transpile'])
    gulp.watch(paths.css, ['css'])
    gulp.watch(paths.static, ['static'])

    require('./dist/server')
})
