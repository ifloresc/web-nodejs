var express = require('express');

function obtenerUsuario(req, res, next, id) {
	setTimeout(function() {
		if (id == "1") {
			res.locals.usuario = {nombre : 'Ivan'};
			next();
		} else {
			res.render('usuario/404');
		}
	}, 1000);
}

// Modulo Usuarios
var usuarios = express.Router();

usuarios.param('id', obtenerUsuario);

usuarios.get('/list', function(req, res) {
	var usuarios = [
		{nombre: 'Sebastian', apellido: 'Flores'},
		{nombre: 'Ivan', apellido: 'Flores'},
		{nombre: 'Benjamin', apellido: 'Flores'},
		{nombre: 'Carolina', apellido: 'Imperiale'}
	];

	res.render('usuario/list', {usuarios : usuarios});
});

usuarios.get('/new', function(req, res) {
	res.render('usuario/add');
});

usuarios.post('/add', function(req, res) {
	throw new Error('Ohh no !!');
	console.log(req.body);
	res.render('usuario/list');
});

usuarios.get('/:id', function(req, res) {
	res.render('usuario/get');
});

usuarios.get('/:id/edit', function(req, res) {
	res.render('usuario/get');
});

usuarios.get('/:id/del', function(req, res) {
	res.render('usuario/get');
});

module.exports = usuarios;