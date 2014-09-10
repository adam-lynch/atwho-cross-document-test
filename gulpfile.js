var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function(){
    browserSync({
        server: {
            baseDir: './src'
        },
        ghostMode: false
    });
});

gulp.task('watch', ['serve'], function(){
    gulp.watch(['./src/**', './bower_components/**'], browserSync.reload)
});

gulp.task('default', ['watch']);