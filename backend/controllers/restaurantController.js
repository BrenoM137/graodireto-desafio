const Restaurant = require('../models/restaurantModel');

class RestaurantController {

    // Registrar um restaurante
    static async register(req, res) {
        const { name, description, address, phone, image, dishes, drinks } = req.body;

        // Validations
        if (!name || !description || !address || !phone || !image || !dishes || !drinks) {
            return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
        }

        const restaurant = new Restaurant({
            name,
            description,
            address,
            phone,
            image,
            dishes,
            drinks
        });

        try {
            await restaurant.save();
            res.status(201).json({ msg: 'Restaurante criado com sucesso!' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'Erro no servidor! Tente novamente mais tarde.' });
        }
    }

    // Mostrar todos os restaurantes
    static async getAll(req, res) {
        try {
            const restaurants = await Restaurant.find();
            res.status(200).json(restaurants);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'Erro no servidor! Tente novamente mais tarde.' });
        }
    }

    // Mostrar detalhes do restaurante selecionado por ID
    static async getById(req, res) {
        const id = req.params.id;

        try {
            const restaurant = await Restaurant.findById(id);

            if (!restaurant) {
                return res.status(404).json({ msg: 'Restaurante não encontrado!' });
            }

            res.status(200).json(restaurant);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'Erro no servidor! Tente novamente mais tarde.' });
        }
    }
}

module.exports = RestaurantController;