
'use strict';

var gulp         = require("gulp");
var gutil        = require("gulp-util");
var twig         = require('gulp-twig');
var htmlmin      = require('gulp-htmlmin');
var coffee       = require("gulp-coffee");
var concat       = require("gulp-concat");
var uglify       = require("gulp-uglify");
var browserify   = require("gulp-browserify");
var postcss      = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var compass      = require("gulp-compass");
var imagemin     = require("gulp-imagemin");
var pngquant     = require("imagemin-pngquant");
var browserSync  = require('browser-sync').create();


// BROWSER-SYNC
var domen = "online-store.pro"; // DOMEN
var watchBrowserSync = [        // WATCH
	"app/**/*.*",
	"public/**/*.*"
];

// DEFAULT
gulp.task('default', [
	"html",
	"styles",
	"coffee",
	"js",
	"images",
	"watch",
	"browser-sync"
]);

// GULP-WATCH
gulp.task('watch', function() {
	gulp.watch(htmlSources,    ['html']);
	gulp.watch(sassSources,    ['styles']);
	gulp.watch(coffeeSources,  ['coffee']);
	gulp.watch(scriptsSources, ['js']);
	gulp.watch(imagesSources,  ['images']);
});

// WATCH BROWSER-SYNC
gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: domen
	});
	gulp.watch( watchBrowserSync ).on('change', browserSync.reload);
});


// HTML
var htmlSources        = ["assets/views/**/*.html"];
var htmlDestination    = "app/views";

// SASS
var sassSources        = "assets/sass/**/*.scss";
var sassDestination    = "public/styles";

// COFFEE
var coffeeSources      = "assets/coffee/**/*.*";
var coffeeDestination  = "assets/scripts";

// SCRIPTS
var scriptsSources = [
	"assets/scripts/main.js",
];
var scriptDestination  = "public/scripts";

// IMAGES
var imagesSources      = "assets/images/**/*.*";
var imagesDestination  = "public/images";


// HTML
gulp.task( 'html', function() {
	gulp.src(htmlSources)
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(htmlDestination));
});

// STYLES
gulp.task('styles', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass:  'assets/sass',
			css:   'public/styles',
			image: 'public/images',
			style: 'compressed'
		}))
		.on('error', gutil.log)
		.pipe(postcss([ autoprefixer({ 
			browsers: ['last 2 versions'] 
		}) ]))
		.pipe(gulp.dest(sassDestination));
});

// COFFEE
gulp.task( 'coffee', function() {
	gulp.src( coffeeSources )
		.pipe( coffee({
			bare: true
		}).on('error', gutil.log ))
		.pipe(gulp.dest(coffeeDestination));
});

// SCRIPTS JS
gulp.task('js', function() {
	gulp.src(scriptsSources)
		.pipe(concat('main.js'))
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest(scriptDestination));
});

// IMAGES
gulp.task('images', function() {
	gulp.src(imagesSources)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(imagesDestination));
});