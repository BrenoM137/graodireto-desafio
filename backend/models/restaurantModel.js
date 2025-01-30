const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    price: {
        type: Number,
        required: true
    }
});

const restaurantSchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    phone: String,
    image: String,
    dishes: [dishSchema],
    drinks: [drinkSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;