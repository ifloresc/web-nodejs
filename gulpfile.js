var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('src/public/css/*.sass') // Leer un archivo
  		.pipe(plumber())	
    	.pipe(sourcemaps.init())
		.pipe(sass()) // Compilar SASS
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false})) // Autoprfixer
		.pipe(gulp.dest('.tmp')) // Guardar archivo
        .pipe(sourcemaps.write())
		.pipe(reload({ stream: true })); // Enviar cambios al navegador
});

gulp.task('pug', function() {
	return gulp.src('src/public/*.pug')
  		.pipe(plumber())	
	  .pipe(pug())
	  .pipe(gulp.dest('.tmp'))	
});

gulp.task('sass:prod', function() {
	return gulp.src('src/public/css/*.sass') // Leer un archivo
  		.pipe(plumber())	
		.pipe(sass({ outputStyle: 'compressed'})) // Compilar SASS
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false})) // Autoprfixer
		.pipe(gulp.dest('dist')); // Enviar cambios al navegador
});

gulp.task('pug:prod', function() {
	return gulp.src('src/public/*.pug')
  		.pipe(plumber())	
	  .pipe(pug())
	  .pipe(gulp.dest('dist'))	
});
gulp.task('js', function() {
	gulp.src('./src/**/*.js')
  		.pipe(plumber())	
		.pipe(uglify({compress:true}))
		.pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
    gulp.watch('src/public/css/*.sass', ['sass']);	
  	gulp.watch('src/public/*.pug', ['pug:reload']);
  	gulp.watch('.tmp/*html').on('change', reload);
});

gulp.task('server', ['sass', 'pug'], function() {
	browserSync({
		server: {
			baseDir: ['.tmp', 'src']
		}
	});
    gulp.start('watch');
});

gulp.task('build', ['sass:prod', 'pug:prod', 'js']);

gulp.task('default', ['sass']);