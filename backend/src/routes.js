const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const PerfilController = require('./controllers/PerfilController');
const SessionController = require('./controllers/SessionController');
const { join } = require('./database/db_connection');

const routes = express.Router();

routes.post('/ong', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        telefone: Joi.number().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/ong', OngController.index);

routes.post('/casos', celebrate({
    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        valor: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),CasoController.create);

routes.get('/casos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), CasoController.index);

routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CasoController.delete)

routes.get('/perfil', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), PerfilController.index);

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.create);

module.exports = routes;