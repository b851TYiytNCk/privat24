const {src, dest, series} = require('gulp');
const prefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const minify = require('gulp-minify');
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const pxToRem = require('gulp-px2rem-converter');
const sourcemaps = require('gulp-sourcemaps');

cssSrc = [],
jsSrc = [];


/*
CSS
*/

cssSrc.push(
	'assets/css/normalize.css',
	'assets/css/app.css'
);

/*
JS
*/

jsSrc.push(
	'assets/js/app.js'
);


function css() {
  return src(cssSrc)
	.pipe(sourcemaps.init())
    .pipe(prefixer({
    	overrideBrowserslist: ['last 8 versions'],
			browsers: [
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24',
				'Explorer >= 11',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6',
			],
		}))
	.pipe(pxToRem())
	.pipe(clean({compatibility: 'ie11'}) )
	.pipe(concat('app.css'))
	.pipe(rename( function (path) {
		path.basename += '.min';
	}))
	.pipe(sourcemaps.write('.'))
    .pipe(dest('assets/css/min/'));
}

function js() {
	return src(jsSrc)
	.pipe(sourcemaps.init())
	.pipe(minify({
		noSource: true
	}))
	.pipe(concat('app.js'))
	.pipe(rename( function (path) {
		path.basename += '.min';
	}))
	.pipe(sourcemaps.write('.'))
  	.pipe(dest('assets/js/min/'))
}

exports.default = series(css, js);