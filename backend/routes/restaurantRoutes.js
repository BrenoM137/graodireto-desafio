const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');

// Registrar um restaurante
router.post('/restaurants/register', RestaurantController.register);

// Mostrar todos os restaurantes
router.get('/restaurants', RestaurantController.getAll);

// Mostrar detalhes do restaurante selecionado por ID
router.get('/restaurants/:id', RestaurantController.getById);

module.exports = router;