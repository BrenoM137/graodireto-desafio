const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Private Route
router.get("/user/:id", UserController.checkToken, UserController.getUserById);

// Register route
router.post('/auth/register', UserController.register);

// Login route
router.post('/auth/login', UserController.login);

module.exports = router;