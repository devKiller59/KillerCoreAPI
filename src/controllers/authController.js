const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función auxiliar para generar el Token de Identidad Unificada
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// 1. REGISTRO DE USUARIO (POST)
const registerUser = async (req, res, next) => {
    try {
        const { first_name, last_name, username, email, password, birthday } = req.body;

        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(400).json({ message: 'El correo electrónico ya está registrado' });

        const usernameExists = await User.findOne({ username });
        if (usernameExists) return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });

        const newUser = new User({ first_name, last_name, username, email, password, birthday });
        await newUser.save();

        const token = generateToken(newUser);

        res.status(201).json({
            message: '🚀 Usuario registrado con éxito en KillerCore',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor durante el registro', error: error.message });
    }
};

// 2. INICIO DE SESIÓN (LOGIN)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Credenciales inválidas (Correo no encontrado)' });

        if (!user.isActive) return res.status(403).json({ message: 'Esta cuenta ha sido suspendida globalmente' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas (Contraseña incorrecta)' });

        const token = generateToken(user);

        res.status(200).json({
            message: `¡Bienvenido de vuelta, ${user.first_name}!`,
            token,
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor durante el login', error: error.message });
    }
};

// 3. OBTENER PERFIL (GET) (Ruta Protegida)
const getUserProfile = async (req, res) => {
    try {
        if (!req.user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({
            message: 'Perfil de usuario obtenido correctamente',
            user: {
                id: req.user._id || req.user.id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                username: req.user.username,
                email: req.user.email,
                role: req.user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
