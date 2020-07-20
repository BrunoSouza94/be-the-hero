const express = require('express');

const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const PerfilController = require('./controllers/PerfilController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/ong', OngController.create);
routes.get('/ong', OngController.index);

routes.post('/casos', CasoController.create);
routes.get('/casos', CasoController.index);
routes.delete('/casos/:id', CasoController.delete)

routes.get('/perfil', PerfilController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;