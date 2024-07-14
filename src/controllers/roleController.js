// roleController.js
const roleModel = require('../models/roleModel');

// Método para crear un rol
const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const newRole = await roleModel.createRole(name);
        return res.status(201).json(newRole);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating role' });
    }
};

// Método para obtener un rol por nombre
const getRoleByName = async (req, res) => {
    try {
        const { name } = req.params;
        const role = await roleModel.findRoleByName(name);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        return res.status(200).json(role);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving role' });
    }
};

const getAllRoles = async (req, res) => {
    try {
        const roles = await roleModel.findAllRoles();
        return res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving roles' });
    }
};

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedRole = await roleModel.updateRole(id, name);
        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        return res.status(200).json(updatedRole);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating role' });
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRole = await roleModel.deleteRole(id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        return res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting role' });
    }
};

module.exports = { createRole, getRoleByName, getAllRoles, updateRole, deleteRole };