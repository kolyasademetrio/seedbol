const { src, dest, watch, task, series } = require("gulp");
const sass = require("gulp-sass")(require("sass")); //Подключаем Sass пакет,
const sourcemaps = require("gulp-sourcemaps"); //Что б в режиме разработчика показывало норм стили
const plumber = require("gulp-plumber"); // Чтоб при ошибке не падал сервер
const autoprefixer = require("gulp-autoprefixer"); // Подключаем библиотеку для автоматического добавления префиксов
const browserSync = require("browser-sync").create(); // Подключаем Browser Sync
const fileInclude = require("gulp-file-include");
const htmlbeautify = require("gulp-html-beautify");
const del = require("del"); // Подключаем библиотеку для удаления файлов и папок

const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminZopfli = require("imagemin-zopfli");
const imageminMozjpeg = require("imagemin-mozjpeg"); //need to run 'brew install libpng'
const imageminGiflossy = require("imagemin-giflossy");

const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat"); // Подключаем gulp-concat (для конкатенации файлов)
const cleanCSS = require("gulp-clean-css"); // Подключаем пакет для минификации CSS

const rename = require("gulp-rename"); // Подключаем библиотеку для переименования файлов

//const imagemin     = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
//const pngquant     = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
//const cache        = require('gulp-cache'); // Подключаем библиотеку кеширования

function scss() {
   return src("dist/scss/**/*.scss") // Берем источник
      .pipe(sourcemaps.init()) //Что б в режиме разработчика показывало норм стили
      .pipe(plumber()) // Чтоб при ошибке не падал сервер
      .pipe(
         sass({
            // outputStyle: "compressed",
         }).on("error", sass.logError)
      ) // Преобразуем Sass в CSS посредством
      .pipe(
         autoprefixer(["last 10 versions", "> 1%", "ie 9", "ie 10"], {
            cascade: true,
         })
      ) // Создаем префиксы
      .pipe(rename("style.css"))
      .pipe(sourcemaps.write("."))
      .pipe(dest("app/css"));
}

// function fonts() {
//    return src('dist/**/*.{ttf,woff,eot,svg}')
//       .pipe(dest('app'));
// }

function html() {
   return src("dist/**.html")
      .pipe(
         fileInclude({
            prefix: "@@",
            basepath: "@file",
         })
      )
      .pipe(
         htmlbeautify({
            indent_with_tabs: true, //отступу табами
            max_preserve_newlines: 0, //максимальное число новых строк
         })
      )
      .pipe(dest("app"));
}

function js() {
   return src(["dist/libs/jquery-3.0.0.min.js", "dist/libs/**/*.js", "dist/**/*.js"]).pipe(
      dest("app/js")
   );
}

function images() {
   return src("dist/images/**/*.{gif,png,jpg,svg,webp,jfif,ico}")
      .pipe(
         cache(
            imagemin([
               //png
               imageminPngquant({
                  speed: 1,
                  quality: [0.95, 1], //lossy settings
               }),
               imageminZopfli({
                  more: true,
                  // iterations: 50 // very slow but more effective
               }),
               //gif very light lossy, use only one of gifsicle or Giflossy
               imageminGiflossy({
                  optimizationLevel: 3,
                  optimize: 3, //keep-empty: Preserve empty transparent frames
                  lossy: 2,
               }),
               //svg
               imagemin.svgo({
                  plugins: [
                     {
                        removeViewBox: false,
                     },
                  ],
               }),
               //jpg lossless
               imagemin.mozjpeg({
                  progressive: true,
               }),
               //jpg very light lossy, use vs jpegtran
               imageminMozjpeg({
                  quality: 90,
               }),
            ])
         )
      )
      .pipe(dest("app/images"));
}

function clear() {
   return del(["app/**", "!app/fonts"]);
}

function serve() {
   browserSync.init({
      server: {
         baseDir: "app", // Директория для сервера - app
      },
      browser: "chrome",
      notify: false,
   });

   watch("dist/**/*.html", series(html)).on("change", browserSync.reload);
   watch("dist/scss/**/*.scss", series(scss)).on("change", browserSync.reload);
   watch("dist/js/**/*.js", series(js)).on("change", browserSync.reload);
}

exports.images = images;
exports.build = series(clear, scss, html, js, images);
exports.default = series(clear, scss, html, js, images, serve);
