const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 1. ACTUALIZAR USUARIO (PUT)
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        delete updates._id;

        if (updates.password && updates.password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        } else {
            delete updates.password;
        }

        const userUpdated = await User.findByIdAndUpdate(id, updates, { 
            returnDocument: 'after'
        }).select('-password');

        if (!userUpdated) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json({ message: 'Usuario actualizado correctamente', userUpdated });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
};

// 2. ELIMINAR USUARIO (DELETE)
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

// 3. OBTENER TODOS LOS USUARIOS (GET)
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al leer los usuarios' });
    }
};

// 4. OBTENER USUARIO POR USERNAME (GET)
const getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username.toLowerCase() }).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
    }
};

// 5. OBTENER USUARIO POR ID (GET)
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserByUsername
};
