// roleModel.js
const pool = require('../config/config');

const createRole = async (roleName) => {
  const result = await pool.query(
    'INSERT INTO roles (name) VALUES ($1) RETURNING *',
    [roleName]
  );
  return result.rows[0];
};

const findRoleByName = async (name) => {
  const result = await pool.query('SELECT * FROM roles WHERE name = $1', [name]);
  return result.rows[0];
};

const findAllRoles = async () => {
  const result = await pool.query('SELECT * FROM roles');
  return result.rows;
};

const updateRole = async (id, name) => {
  const result = await pool.query(
    'UPDATE roles SET name = $2 WHERE id = $1 RETURNING *',
    [id, name]
  );
  return result.rows[0];
};

const deleteRole = async (id) => {
  const result = await pool.query('DELETE FROM roles WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = { createRole, findRoleByName, findAllRoles, updateRole, deleteRole };