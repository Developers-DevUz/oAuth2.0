// userController.js
const userModel = require('../models/userModel');

const createUser = async (req, res) => {
    try {
        const { email, password, googleId } = req.body;
        if (!email || !password) { // Assuming googleId is optional
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const userExists = await userModel.findUserByEmail(email);
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const user = await userModel.createUser({ email, password, googleId });
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving user' });
    }
};

const getUserByGoogleId = async (req, res) => {
    try {
        const { googleId } = req.params;
        const user = await userModel.findUserByGoogleId(googleId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving user' });
    }
};
const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, googleId } = req.body;
      const updatedUser = await userModel.updateUser(id, email, password, googleId);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating user' });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await userModel.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting user' });
    }
  };
  
  module.exports = { createUser, getUserByEmail, getUserByGoogleId, updateUser, deleteUser };