var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	$ = require('gulp-load-plugins')();

gulp.task('sass', function() {
	return gulp.src('src/public/css/*.sass') // Leer un archivo
  		.pipe($.plumber())	
    	.pipe($.sourcemaps.init())
		.pipe($.sass()) // Compilar SASS
        .pipe($.autoprefixer({ browsers: ['last 2 versions'], cascade: false})) // Autoprfixer
		.pipe(gulp.dest('.tmp')) // Guardar archivo
        .pipe($.sourcemaps.write())
		.pipe(reload({ stream: true })); // Enviar cambios al navegador
});

gulp.task('pug', function() {
	return gulp.src('src/public/*.pug')
  		.pipe($.plumber())	
	  .pipe($.pug())
	  .pipe(gulp.dest('.tmp'))	
});

gulp.task('sass:prod', function() {
	return gulp.src('src/public/css/*.sass') // Leer un archivo
  		.pipe($.plumber())	
		.pipe($.sass({ outputStyle: 'compressed'})) // Compilar SASS
        .pipe($.autoprefixer({ browsers: ['last 2 versions'], cascade: false})) // Autoprfixer
		.pipe(gulp.dest('dist')); // Enviar cambios al navegador
});

gulp.task('pug:prod', function() {
	return gulp.src('src/public/*.pug')
  		.pipe($.plumber())	
	  .pipe($.pug())
	  .pipe(gulp.dest('dist'))	
});

gulp.task('js', function() {
	gulp.src('./src/**/*.js')
  		.pipe($.plumber())	
		.pipe($.uglify({compress:true}))
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

gulp.task('upload', ['build'], function() {
	var ftp = ftpConnection();
	var remoteFolder = '/_demos/acamica/demo-1-2/';
	return gulp.src('dist/**', { base: 'dist', buffer: false})
		.pipe($.ftp.newer(remoteFolder))
		.pipe($.ftp.dest(remoteFolder));
});

gulp.task('default', ['sass']);

function ftpConnection() {
	return $.ftp.create({
		host: 'acamica.com',
		user: 'sergio',
		password: process.env.FTP_PWD,
		parallel: 5,
		log: gutil.log
	})
};