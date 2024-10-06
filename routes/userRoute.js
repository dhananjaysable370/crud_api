const express = require('express');
const { createUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController.js');
const router = express.Router();

// Define the route to create a user
router.route('/create').post(createUser);
router.route('/getallusers').get(getAllUsers)
router.route('/updateuser/:id').put(updateUser)
router.route('/deleteuser/:id').delete(deleteUser)


module.exports = router;
