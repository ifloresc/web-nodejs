// Cargamos express
var express = require('express');
var exphbs  = require('express-handlebars');

var routes =  require('./config/routes');

var bodyParser = require('body-parser');

// Lo iniciamos
var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

// Errores en sitio
app.use(function(req, res) {
	res.status(404).render('error/404');
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500).render('error/500');
});

// Decimos en que puerto queremos escuchar (el 8000)
app.listen(8000, function() {
	console.log("Esperando request en el puerto 8000");
});

var hbs = exphbs.create({
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: {
		list: function (elementos, options) {
			if (!elementos) {
				return '';
			}

			var ans = '<ul>';

			elementos.forEach(function(elemento) {
				ans += '<li>' + options.fn(elemento) + '</li>';
			});

			ans += '</ul>';

			return ans;
		}
	}
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');