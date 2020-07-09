const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const rigger = require('gulp-rigger');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
// const reload = browserSync.reload;


// var path = {
//     dist: { //Тут мы укажем куда складывать готовые после сборки файлы
//         html: 'dist/'     
//     },
//     src: { //Пути откуда брать исходники
//         html: 'src/**/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
      
//     },
//     watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
//         html: 'src/**/*.html',
       
//     },
//     clean: './dist'
// };



gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    
    // gulp.watch("src/*.html").on('change', gulp.parallel('fileinclude'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/**/*.js").on('change', gulp.parallel('scripts'));

    // gulp.watch("src/**/*.html").on('change', gulp.parallel('html:build'));

});

// gulp.task('html:build', function () {
//     return gulp.src("src/**/*.html") //Выберем файлы по нужному пути
//     .pipe(rigger()) //Прогоним через rigger
//     .pipe(gulp.dest("dist/")) //Выплюнем их в папку build    
//     .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений 
// });

 
// gulp.task('fileinclude', function() {
//  return gulp.src(['src/**/*.html'])
//     .pipe(fileinclude({
//         prefix: '@@',
//         basepath: '@file'
//       }))
//     .pipe(gulp.dest('./dist'));
// });

gulp.task('html', function() {
    return gulp.src("src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function() {
    return gulp.src("src/js/*.js")
    .pipe(gulp.dest("dist/js"));
});
gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
});
gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
    .pipe(gulp.dest("dist/icons"));
});
gulp.task('mailer', function() {
    return gulp.src("src/mailer/**/*")
    .pipe(gulp.dest("dist/mailer"));
});
gulp.task('image', function() {
    return gulp.src("src/image/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/image"));
});

// gulp.task('html:build', function () {
//     gulp.src(path.src.html) //Выберем файлы по нужному пути
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(gulp.dest(path.dist.html)) //Выплюнем их в папку build
//         .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
// });

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'image' ));
