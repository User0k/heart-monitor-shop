const { src, dest, watch, parallel, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const include = require('gulp-file-include');
const scss = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webphtml = require('gulp-webp-html');
const webpcss = require('gulp-webpcss');
const del = require('del');
const sync = require('browser-sync').create();

function html() {
  return src('src/*.html')
  .pipe(include({
    prefix: '@@'
  }))
  .pipe(webphtml())
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(dest('dist'))
}

function styles() {
  return src('src/scss/**/*')
  .pipe(scss({outputStyle: 'compressed' /*'expanded'*/}))
  .pipe(prefixer())
  .pipe(webpcss())
  .pipe(concat('style.min.css'))
  .pipe(dest('dist'))
}

function scripts() {
  return src('src/js/index.js')
  .pipe(concat('index.min.js'))
  .pipe(uglify())
  .pipe(dest('dist'))
}

function images() {
  return src('src/img/**/*')
  .pipe(webp({
    quality: 70
  }))
  .pipe(dest('dist/img/'))
  .pipe(src('src/img/**/*'))
  .pipe(imagemin(
    [
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
          ]
      })
  ]))
  .pipe(dest('dist/img/'))
}

function fonts() {
  return src('src/fonts/*')
  .pipe(dest('dist/fonts/'))
}


function clean() {
  return del('dist')
}

function _clean() {
  return del('dist/_*.html')
}

function serve () {
  sync.init({
    server: './dist'
  })
  watch('src/*.html', html).on('change', sync.reload)
  watch('src/scss/**/*.scss', styles).on('change', sync.reload)
  watch('src/js/**/*.js', scripts).on('change', sync.reload)
}

exports.default = series(clean, parallel(styles, html, scripts, serve));
exports.build = series(clean, parallel(styles, html, scripts, images, fonts), _clean);
exports.html = html;