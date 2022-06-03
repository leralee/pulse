const gulp = require('gulp');
const browserSync = require('browser-sync');
var sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const devip = require('dev-ip');

gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: "src",
            proxy: "192.168.1.71:3000"
        }
    })
});


gulp.task('styles', function(){
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //компилируем код, он превращается style.css
        .pipe(rename({
            prefix: '',
            suffix: '.min', 
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css")) //отправляем в папку css
        .pipe(browserSync.stream()); //обновляет изменения на сервере
});

gulp.task('watch', function(){
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"))
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));

