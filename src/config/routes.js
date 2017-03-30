var usuarios = require('../modules/users/index');
var saludador = require('../controllers/saludadorController');
var index = require('../controllers/indexController');

module.exports = function(app) {
  app.get('/despedida', saludador.despedida);
  app.get('/saludo', saludador.saludo);
  // Index  
  app.get('/', index.index);
  // Modulos
  app.use('/usuario', usuarios);
};