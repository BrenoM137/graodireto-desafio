require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurantModel');
const User = require('./models/userModel');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.c0jgs.mongodb.net/graodireto_desafio?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Conectado ao banco de dados.');
        seedDatabase();
    })
    .catch((err) => console.log(err));

const seedDatabase = async () => {
    try {
        // Restaurantes a serem adicionados
        const restaurants = [
            {
                name: "Restaurante Brasileiro",
                description: "Comida típica brasileira",
                address: "Rua das Flores, 123",
                phone: "123456789",
                image: "images/brasileira.jpg",
                dishes: [
                    { name: "Feijoada", description: "Feijão preto com carne de porco", price: 25.00, image: "images/feijoada.jpg" },
                    { name: "Picanha", description: "Picanha grelhada com arroz e farofa", price: 30.00, image: "images/picanha.jpg" }
                ],
                drinks: [
                    { name: "Água", price: 3.00, image: "images/agua.jpg" },
                    { name: "Coca-Cola", price: 5.00, image: "images/coca-cola.jpg" }
                ]
            },
            {
                name: "Restaurante Japonês",
                description: "Comida típica japonesa",
                address: "Rua do Sol, 456",
                phone: "987654321",
                image: "images/japonesa.jpg",
                dishes: [
                    { name: "Sushi", description: "Sushi variado", price: 40.00, image: "images/sushi.jpg" },
                    { name: "Tempura", description: "Legumes e camarões empanados", price: 35.00, image: "images/tempura.png" }
                ],
                drinks: [
                    { name: "Água", price: 3.00, image: "images/agua.jpg" },
                    { name: "Chá Verde", price: 4.00, image: "images/cha.jpg" }
                ]
            },
            {
                name: "Hamburgueria",
                description: "Hambúrgueres artesanais",
                address: "Avenida Central, 789",
                phone: "1122334455",
                image: "images/hamburgueria.jpg",
                dishes: [
                    { name: "Cheeseburger", description: "Hambúrguer com queijo", price: 20.00, image: "images/cheeseburger.jpg" },
                    { name: "Bacon Burger", description: "Hambúrguer com bacon", price: 22.00, image: "images/bacon.jpg" }
                ],
                drinks: [
                    { name: "Água", price: 3.00, image: "images/agua.jpg" },
                    { name: "Coca-Cola", price: 5.00, image: "images/coca-cola.jpg" }
                ]
            },
            {
                name: "Restaurante Mexicano",
                description: "Comida típica mexicana",
                address: "Praça das Américas, 101",
                phone: "5566778899",
                image: "images/mexicana.jpg",
                dishes: [
                    { name: "Tacos", description: "Tacos variados", price: 18.00, image: "images/tacos.jpg" },
                    { name: "Burrito", description: "Burrito de carne", price: 20.00, image: "images/burrito.jpg" }
                ],
                drinks: [
                    { name: "Água", price: 3.00, image: "images/agua.jpg" },
                    { name: "Margarita", price: 10.00, image: "images/margarita.jpg" }
                ]
            }
        ];

        // Usuario a ser adicionado
        const users = [
            {
                username: 'Fred',
                email: 'fred@graodireto.com.br',
                address: 'Endereço 1',
                phone: '987654321',
                password: '123Fred'
            },

        ];

        await Restaurant.insertMany(restaurants);
        await User.insertMany(users);

        console.log('Banco de dados populado com sucesso!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Erro ao popular o banco de dados', error);
        mongoose.connection.close();
    }
};