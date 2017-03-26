var saludador = require('../models/saludador');

function saludo (req, res) {
  var nombre = req.query.nombre;
  var id = req.params.id;

  res.locals.id = req.params.id;
  res.locals.mensaje = saludador.saludar(nombre);

  res.render('saludo');
}

function despedida (req, res) {
  var nombre = req.query.nombre;
  res.render('despedida',  { mensaje: saludador.saludar(nombre) });
}

module.exports = {
  saludo: saludo,
  despedida: despedida
};