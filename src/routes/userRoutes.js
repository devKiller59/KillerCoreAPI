const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de búsqueda y listado
router.get('/username/:username', userController.getUserByUsername);
router.get('/', userController.getAllUsers);

// Rutas genéricas con parámetro dinámico
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;