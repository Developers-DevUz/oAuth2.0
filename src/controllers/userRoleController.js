// userRoleController.js
const userRoleModel = require('../models/userRoleModel');

const assignRole = async (req, res) => {
  try {
	const { userId, roleId } = req.body;
	const assignedRole = await userRoleModel.assignRoleToUser(userId, roleId);
	res.status(201).json(assignedRole);
  } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Error assigning role to user' });
  }
};

const removeRole = async (req, res) => {
  try {
	const { userId, roleId } = req.body;
	const removedRole = await userRoleModel.removeRoleFromUser(userId, roleId);
	if (!removedRole) {
	  return res.status(404).json({ message: 'Role not found for this user' });
	}
	res.status(200).json({ message: 'Role removed successfully' });
  } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Error removing role from user' });
  }
};

const getRolesByUser = async (req, res) => {
  try {
	const { userId } = req.params;
	const roles = await userRoleModel.findRolesByUser(userId);
	res.status(200).json(roles);
  } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Error fetching roles by user' });
  }
};

const getUsersByRole = async (req, res) => {
  try {
	const { roleId } = req.params;
	const users = await userRoleModel.findUsersByRole(roleId);
	res.status(200).json(users);
  } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Error fetching users by role' });
  }
};

module.exports = { assignRole, removeRole, getRolesByUser, getUsersByRole };