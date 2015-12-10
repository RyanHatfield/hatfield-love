var gulp = require('gulp'),
    util = require('gulp-util'),
    jshint = require('gulp-jshint'),
    http = require('http'),
    st = require('st'),
    livereload = require('gulp-livereload');

gulp.task('default', function() {
    return util.log('Gulp is running!');
});

gulp.task('lint', function() {
    return util.log('Gulp Lint task not implemented');
});

gulp.task('jshint', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copyCss', function() {
    return gulp.src('src/css/*.css').pipe(gulp.dest('dist/css')).pipe(livereload());
});

gulp.task('copyJs', function() {
    return gulp.src('src/js/*.js').pipe(gulp.dest('dist/js')).pipe(livereload());
});

gulp.task('copyHtml', function() {
    return gulp.src('src/*.html').pipe(gulp.dest('dist')).pipe(livereload());
});

gulp.task('copyImg', function() {
    return gulp.src('src/img/**/*').pipe(gulp.dest('dist/img')).pipe(livereload());
})

gulp.task('copyDist', ['lint','copyHtml','copyCss','copyJs', 'copyImg'], function() {
    return util.log('Copy Dist task ran successfully');
});

gulp.task('watchJs', function() {
    return gulp.watch('src/js/**/*.js', ['jshint', 'copyJs']);
});

gulp.task('watchCss', function() {
    return gulp.watch('src/css/**/*.css', ['copyCss']);
});

gulp.task('watchHtml', function() {
    return gulp.watch('src/**/*.html', ['copyHtml']);
});

gulp.task('watchImg', function() {
    return gulp.watch('src/img/**/*', ['copyImg']);
})

gulp.task('watch', ['watchJs', 'watchHtml', 'watchCss', 'watchImg'], function() {
    return livereload.listen({ basePath: 'dist' });
});

gulp.task('server', ['watch'], function(done) {
  http.createServer(
    st({ path: __dirname + '/dist', index: 'index.html', cache: false })
  ).listen(8080, done);
});
