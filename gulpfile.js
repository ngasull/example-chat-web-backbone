'use strict';

var fs = require('fs')
var gulp = require('gulp')
var npm = require('npm')
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

function doBrowserify(watch) {

    var bundler,
        entry = './src/web/chat-backbone.jsx',
        props = {
            cache: {},
            packageCache: {},
            debug: true
        }

    function bundle() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('chat-backbone.js'))
            .pipe(buffer())
            .pipe(gulp.dest('dist/web/static'))
    }

    bundler = browserify(entry, props)
        .transform('babelify', {
            sourceMaps: true
        })

    if (watch) {
        bundler = watchify(bundler)

        bundler.on('update', bundle)
        bundler.on('bytes', function () {
            livereload.reload()
        })
    }


    bundler.on('log', gutil.log)
    bundler.on('error', gutil.log)

    return bundle()
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

gulp.task('browserify', function () {
    return doBrowserify(false)
})

gulp.task('watchify', function () {
    return doBrowserify(true)
})

gulp.task('clean', function () {
    del.sync('dist')
})

gulp.task('package-static', function () {
    return gulp.src(['package.json', 'README.md', 'LICENSE'])
        .pipe(gulp.dest('dist'))
})

gulp.task('package.json', ['package-static'], function (done) {
    var pkg = require('./package.json')

    // Get the version and increment the last element
    var versionMatch = pkg.version.match(/^(.+\.)(\d+)$/)
    pkg.version = versionMatch[1] + (parseInt(versionMatch[2]) + 1)

    // Overwrite to the version incremented package.json
    fs.writeFile('./package.json', new Buffer(JSON.stringify(pkg, null, '  ')), done)
})

gulp.task('publish', ['transpile', 'css', 'static', 'browserify', 'package.json'], function (done) {
    npm.commands.publish(['dist'], done)
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
