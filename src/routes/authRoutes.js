const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Asegúrate de que bcrypt esté importado
const User = require('../models/userModel'); // Ajusta la ruta según sea necesario
const router = express.Router();
// Función para autenticar usuario
const authenticateUser = async (email, password) => {
    try {
        const user = await User.findUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
};

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    if (!user) return res.status(403).send('Email or password incorrect');

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Ruta para registrar usuario
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Assuming createUser function accepts a user object with hashed password
        const newUser = await User.createUser({ email, password: hashedPassword, googleId: null });

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Internal server error');
    }
});


// Exportar el router
module.exports = router;