// userModel.js
const pool = require('../config/config');

const createUser = async (user) => {
  const { email, password, googleId } = user;
  const result = await pool.query(
    'INSERT INTO users (email, password, google_id) VALUES ($1, $2, $3) RETURNING *',
    [email, password, googleId]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findUserByGoogleId = async (googleId) => {
  const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
  return result.rows[0];
};

const updateUser = async (id, email, password, googleId) => {
  const result = await pool.query(
    'UPDATE users SET email = $2, password = $3, google_id = $4 WHERE id = $1 RETURNING *',
    [id, email, password, googleId]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserByGoogleId, updateUser, deleteUser };