const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// Rutas públicas (no requieren token)
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Rutas privadas (requieren token)
router.get('/profile', protect, authController.getUserProfile);

module.exports = router;