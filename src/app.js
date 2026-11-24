const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- Importado
const path = require('path');

const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './public'))); // Servir archivos estáticos

// Ruta base informativa del ecosistema de la API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

// Rutas de gestión de usuarios (CRUD)
app.use('/api/users', usersRoutes);

// Rutas de autenticación y perfil
app.use('/api/auth', authRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;
