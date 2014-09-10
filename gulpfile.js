var gulp = require('gulp');
var browserSync = require('browser-sync');
var mainBowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')();

gulp.task('third-party', function(){
   var jsFilter = $.filter(function(file){
       return file.path.match(/\.js$/);
   });

   var mainFiles = mainBowerFiles();

   if(!mainFiles) return

   gulp.src(mainFiles)
       .pipe(jsFilter)
       .pipe($.concat('third-party.js'))
       .pipe(gulp.dest('./src'))
       .pipe(jsFilter.restore())
       .pipe($.filter(function(file){
           return file.path.match(/\.css$/);
       }))
       .pipe($.concat('third-party.css'))
       .pipe(gulp.dest('./src'));
});

gulp.task('serve', ['third-party'], function(){
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