/* gulpfile.js */

var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var del = require('del');  // Deletes files.
var reactify = require('reactify');  // Transforms React JSX to JS.
var changed = require('gulp-changed');
var source = require('vinyl-source-stream');
var browserSync = require("browser-sync");

// Define some paths.
var paths = {
    rdt: ['./src/js/react-datatable/rdt.jsx'],
    jsx: ['./src/js/react-datatable/*.jsx'],
    js: ['./src/js/index.js']
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
    // Browserify/bundle the JS.
    return browserify(paths.rdt,{standalone: 'RDT'})
        .transform(reactify)
        .bundle()
        .pipe(source('react-datatable.js'))
        .pipe(gulp.dest('./dist/js'));

});


gulp.task('js', function () {
    return browserify(paths.js,{standalone: 'RDT'})
        .transform(reactify)
        .bundle()
        .pipe(source('rdt-dev.js'))
        .pipe(gulp.dest('./dist/'));

});


gulp.task('watch', function () {
    gulp.watch(staticPaths[0], ['static', browserSync.reload]);
    gulp.watch(staticPaths[1], ['static', browserSync.reload]);
    gulp.watch(paths.jsx, ['js', browserSync.reload]);
    gulp.watch(paths.js, ['js', browserSync.reload]);

});



// The default task (called when we run `gulp` from cli)
gulp.task('default', ['browser-sync', 'js', 'static', 'watch']);