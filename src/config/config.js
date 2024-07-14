require('dotenv').config({ path: 'src/environment/.env' }); // Asegúrate de que esto está al inicio

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Asegúrate de que todos los valores son cadenas

const initDb = async () => {
  try {
    // Intenta una consulta simple para probar la conexión
    const res = await pool.query('SELECT NOW()');
    console.log('Conexión a la base de datos exitosa:', res.rows);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};

initDb();

module.exports = pool;