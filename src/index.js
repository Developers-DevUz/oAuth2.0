require('dotenv').config(); // Asegúrate de llamar esto al principio
const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middlewares/authenticateToken');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');

const app = express(); // Inicializa tu aplicación Express aquí
app.use(express.json()); // Middleware para parsear JSON

// Rutas de autenticación
app.use('/api/auth', authRoutes); // Asegúrate de montar tus rutas de autenticación correctamente

// Monta tus rutas
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/userRoles', userRoleRoutes);

// Rutas protegidas
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "This is protected" });
});

const initDbPath = path.join(__dirname, 'database', 'init_db.sql');

const initDb = async () => {
  try {
    const sql = fs.readFileSync(initDbPath, 'utf8');
    await pool.query(sql);
    console.log('Tablas creadas con éxito');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};

// Inicia la inicialización de la base de datos y luego inicia el servidor
initDb().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// initDb().then(() => {
//     console.log('DB_HOST:', process.env.DB_HOST);
//     console.log('DB_PORT:', process.env.DB_PORT);
//     console.log('DB_NAME:', process.env.DB_NAME);
//     console.log('DB_USER:', process.env.DB_USER);
//     console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// });
