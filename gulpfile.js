/* gulpfile.js */

var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var del = require('del');  // Deletes files.
var reactify = require('reactify');  // Transforms React JSX to JS.
var changed = require('gulp-changed');
var source = require('vinyl-source-stream');
//var stylus = require('gulp-stylus');  // To compile Stylus CSS.
var browserSync = require("browser-sync");

// Define some paths.
var paths = {
    // css: ['src/css/**/*.styl'],
    rdt: ['./src/js/rdt/rdt.jsx'],
    js: ['./src/js/index.js']
};
var staticPaths = ['./src/*.html', './src/css/*.css'];

gulp.task('static', function () {
    return gulp.src(staticPaths, { bause: "src/"})
        .pipe(changed('./src/*.html'))
        .pipe(changed('./src/css/*.css'))
        .pipe(gulp.dest('./dist/'));

});
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./dist",
            index: "index.html"
        }
    });
});

gulp.task('rdt-build', function () {
    // Browserify/bundle the JS.
    return browserify(paths.rdt)
        .transform(reactify)
        .bundle()
        .pipe(source('react-datatable.js'))
        .pipe(gulp.dest('./dist/'));

});


gulp.task('js', function () {
    // Browserify/bundle the JS.
    return browserify(paths.js)
        .transform(reactify)
        .bundle()
        .pipe(source('react-datatable.js'))
        .pipe(gulp.dest('./dist/'));

});


gulp.task('watch', function () {
    gulp.watch(staticPaths[0], ['static', browserSync.reload]);
    gulp.watch(staticPaths[1], ['static', browserSync.reload]);
    gulp.watch(paths.js, ['js', browserSync.reload]);
    gulp.watch(paths.app_js, ['js', browserSync.reload]);
});

gulp.task('build',function() {

});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['browser-sync', 'js', 'static', 'watch']);