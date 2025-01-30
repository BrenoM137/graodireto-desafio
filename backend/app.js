require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');
const app = express();
const port = 3000;

app.use('/images', express.static(path.join(__dirname, 'images')));

// Config JSON response
app.use(express.json())

// Public Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Teste teste' });
})

app.use(cors());
app.use(express.json());

// Routes

const authRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

app.post('/auth/register', authRoutes);
app.post('/auth/login', authRoutes);
app.get('/user/:id', authRoutes);
app.post('/restaurants/register', restaurantRoutes);
app.get('/restaurants', restaurantRoutes);
app.get('/restaurants/:id', restaurantRoutes);

// Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.c0jgs.mongodb.net/graodireto_desafio?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    app.listen(port)
    console.log('Conectado ao banco de dados.')
}).catch((err) => console.log(err))