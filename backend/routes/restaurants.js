const express = require('express');
const router = express.Router();

// Mock data
const restaurants = [
    { id: 1, name: 'Restaurant A', dishes: ['Dish 1', 'Dish 2'] },
    { id: 2, name: 'Restaurant B', dishes: ['Dish 3', 'Dish 4'] }
];

// Get all restaurants
router.get('/', (req, res) => {
    res.json(restaurants);
});

// Get restaurant details
router.get('/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id == req.params.id);
    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).send('Restaurant not found');
    }
});

module.exports = router;