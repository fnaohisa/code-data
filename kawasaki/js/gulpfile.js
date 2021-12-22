const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

// ファイルのパスの定義
const paths = {
  'scss': {
    'scss': './dev/scss/*.scss',
  },
  'css': {
    'css': './dev/css/',
  },
  'map': {
    'map': './',
  }
};

gulp.task('sass', done => {
  gulp.src(paths.scss.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(sourcemaps.write({
      includeContent: false
    }))
    .pipe(cleanCSS())
    .pipe(autoprefixer({
      grid: true,
      cascade: false
    }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write(paths.map.map))
    .pipe(gulp.dest(paths.css.css));
  done();
});

gulp.task('default', () => {
  gulp.watch(paths.scss.scss, gulp.task('sass'));
});
