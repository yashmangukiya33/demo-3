const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

router.post('/adduser', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);


module.exports = router;
