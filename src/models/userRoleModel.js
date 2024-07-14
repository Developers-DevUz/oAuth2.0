// userRoleModel.js
const pool = require('../config/config');

// Existing function to assign a role to a user
const assignRoleToUser = async (userId, roleId) => {
  const result = await pool.query(
    'INSERT INTO user_role (user_id, role_id) VALUES ($1, $2) RETURNING *',
    [userId, roleId]
  );
  return result.rows[0];
};

// Function to remove a role from a user
const removeRoleFromUser = async (userId, roleId) => {
  const result = await pool.query(
    'DELETE FROM user_role WHERE user_id = $1 AND role_id = $2 RETURNING *',
    [userId, roleId]
  );
  return result.rows[0];
};

// Function to find roles by user
const findRolesByUser = async (userId) => {
  const result = await pool.query(
    'SELECT roles.* FROM roles JOIN user_role ON roles.id = user_role.role_id WHERE user_role.user_id = $1',
    [userId]
  );
  return result.rows;
};

// Function to find users by role
const findUsersByRole = async (roleId) => {
  const result = await pool.query(
    'SELECT users.* FROM users JOIN user_role ON users.id = user_role.user_id WHERE user_role.role_id = $1',
    [roleId]
  );
  return result.rows;
};

module.exports = { assignRoleToUser, removeRoleFromUser, findRolesByUser, findUsersByRole };