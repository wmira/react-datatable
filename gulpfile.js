/* gulpfile.js */

var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var del = require('del');  // Deletes files.
var react = require('gulp-react');
var changed = require('gulp-changed');
var source = require('vinyl-source-stream');
var browserSync = require("browser-sync");
var es6transpiler = require('gulp-es6-transpiler');


// Define some paths.
var paths = {
    js: ['./src/js/react-datatable/*.js'],
    jsdev: ['./src/js/dev.js']

};
var staticPaths = ['./src/*.html', './src/css/*.css'];

gulp.task('static', function () {
    return gulp.src(staticPaths, { base: "src/"})
        .pipe(changed('./src/*.html'))
        .pipe(changed('./src/css/*.css'))
        .pipe(gulp.dest('./dist'));

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
    return gulp.src(paths.js)
        .pipe(react())
       // .pipe(es6transpiler())
        .pipe(gulp.dest('./dist/js/react-datatable'));


});


gulp.task('js',['rdt-build'],function () {
    return browserify(paths.jsdev)
        .bundle()
        .pipe(source('rdt-dev.js'))
        .pipe(gulp.dest('./dist/'));

});


gulp.task('watch', function () {
    gulp.watch(staticPaths[0], ['static', browserSync.reload]);
    gulp.watch(staticPaths[1], ['static', browserSync.reload]);
    gulp.watch(paths.js, ['js', browserSync.reload]);
    gulp.watch(paths.jsdev, ['js', browserSync.reload]);

});



// The default task (called when we run `gulp` from cli)
gulp.task('default', ['browser-sync', 'js', 'static', 'watch']);