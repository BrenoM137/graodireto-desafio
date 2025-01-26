require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

// Public Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Teste teste' });
})

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurants');

app.use('/auth', authRoutes);
app.use('/restaurants', restaurantRoutes);

// Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect('mongodb+srv://${dbUser}:${dbPassword}@cluster0.c0jgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    app.listen(port)
    console.log('Conectado ao banco de dados.')
}).catch((err) => console.log(err))

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});