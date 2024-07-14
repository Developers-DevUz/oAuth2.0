
// Initilize express router
const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');

// Route to assign a role to a user
router.post('/assign', userRoleController.assignRole);

// Route to remove a role from a user
router.post('/remove', userRoleController.removeRole);

// Route to get roles by user
router.get('/roles/:userId', userRoleController.getRolesByUser);

// Route to get users by role
router.get('/users/:roleId', userRoleController.getUsersByRole);

module.exports = router;