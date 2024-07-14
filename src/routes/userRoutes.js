// Assuming you have a router set up similar to this
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Existing routes
router.post('/', userController.createUser);
router.get('/email/:email', userController.getUserByEmail);
router.get('/googleId/:googleId', userController.getUserByGoogleId);

// New routes for update and delete
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;