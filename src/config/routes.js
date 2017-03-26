var usuarios = require('../modules/users/index');
var saludador = require('../controllers/saludadorController');

module.exports = function(app) {
  app.get('/despedida', saludador.despedida);
  app.get('/saludo/:id', saludador.saludo);
  app.get('/saludo', saludador.saludo);
  
  // Modulos
  app.use('/usuario', usuarios);
};