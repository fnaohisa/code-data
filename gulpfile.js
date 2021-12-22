const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const cleanCSS = require('gulp-clean-css')
const tinyping = require('gulp-tinypng-compress')
const sassGlob = require("gulp-sass-glob")
const cmq = require('gulp-combine-media-queries')

gulp.task("default", function() {
  // style.scssファイルを取得
  return (
    gulp
      .src("./**/*.scss") // コンパイルしたいディレクトリ
      // Sassのコンパイルを実行
      .pipe(plumber())
      .pipe(sassGlob())
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(autoprefixer({browsers: ["last 3 versions", "ie >= 11", "Android >= 5", "iOS >= 8"]}))
      .pipe(cmq())
      .pipe(cleanCSS())
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write('./sourcemaps/'))
      // cssフォルダー以下に保存
      .pipe(gulp.dest(""))　// 出力先
  );
});

gulp.task("tpng", function() {
  return (
    gulp
      .src("../img_min/img/**/*.{png,jpg,jpeg}") // 圧縮したいディレクトリ
      .pipe(tinyping({key: ""})) //ここにAPIkey
      .pipe(gulp.dest("../img_min/min")) // 出力先
  );
});