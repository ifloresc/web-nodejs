// Cargamos express
var express = require('express');
var exphbs  = require('express-handlebars');

var routes =  require('./config/routes');

// Lo iniciamos
var app = express();

routes(app);

// Decimos en que puerto queremos escuchar (el 8000)
app.listen(8000, function() {
	console.log("Esperando request en el puerto 8000");
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');