const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class UserController {

    static async getUserById(req, res) {
        const id = req.params.id;

        // Check if user exists
        const user = await User.findById(id, '-password');

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        res.status(200).json({ user });
    }

    static async register(req, res) {
        const { username, email, address, phone, password, confirmpassword } = req.body;

        // Validations
        if (!username) {
            return res.status(422).send({ msg: 'O usuário é obrigatório!' });
        }

        if (!email) {
            return res.status(422).send({ msg: 'O email é obrigatório!' });
        }

        if (!address) {
            return res.status(422).send({ msg: 'O endereço é obrigatório!' });
        }

        if (!phone) {
            return res.status(422).send({ msg: 'O número de celular é obrigatório!' });
        }

        if (!password) {
            return res.status(422).send({ msg: 'A senha é obrigatória!' });
        }

        if (!confirmpassword) {
            return res.status(422).send({ msg: 'A confirmação de senha é obrigatória!' });
        }

        if (password !== confirmpassword) {
            return res.status(422).send({ msg: 'As senhas devem ser iguais!' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).send({ msg: 'Email já registrado!' });
        }

        // Create password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            username,
            email,
            address,
            phone,
            password: passwordHash,
        });

        try {
            await user.save();
            res.status(201).json({ msg: 'Usuário criado com sucesso!' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'Erro no servidor! Tente novamente mais tarde.' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        // Validations
        if (!email) {
            return res.status(422).send({ msg: 'O email é obrigatório!' });
        }

        if (!password) {
            return res.status(422).send({ msg: 'A senha é obrigatória!' });
        }

        // Check if user exists
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(422).send({ msg: 'Senha ou email incorretos!' });
        }

        // Password checking
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).send({ msg: 'Senha ou email incorretos!' });
        }

        try {
            const secret = process.env.SECRET;
            const token = jwt.sign({ id: user._id }, secret);

            res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token, userName: user.username });
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'Erro no servidor! Tente novamente mais tarde.' });
        }
    }

    static checkToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: 'Acesso negado!' });
        }

        try {
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next();
        } catch (error) {
            res.status(400).json({ msg: 'Token inválido!' });
        }
    }
}

module.exports = UserController;