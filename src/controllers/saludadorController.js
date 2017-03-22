var saludador = require('../models/saludador');

function saludo (req, res) {
  var nombre = req.query.nombre;
  res.render('saludo',  { mensaje: saludador.saludar(nombre) });
}

function despedida (req, res) {
  var nombre = req.query.nombre;
  res.render('despedida',  { mensaje: saludador.saludar(nombre) });
}

module.exports = {
  saludo: saludo,
  despedida: despedida
};