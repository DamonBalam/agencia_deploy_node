const express = require('express');
const router = express.Router();

const nosotroController = require ('../controllers/nosotrosController');
const homeController = require('../controllers/homeController');
const viajesController = require('../controllers/viajesController');
const testimonialesController = require('../controllers/testimonialesController');

module.exports = function () {
    router.get('/',homeController.consultasHomepage);

    router.get('/nosotros',nosotroController.infoNosotros);

    router.get('/viajes',viajesController.consultaViajes);

    router.get('/viajes/:id',viajesController.consultaViajeID);

    router.get('/testimoniales',testimonialesController.consultaTestimoniales);

    router.post('/testimoniales',testimonialesController.agregarTestimonio);

    return router;
}