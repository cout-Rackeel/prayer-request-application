const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUserById, editUserById } = require('../controllers/users-controller');
const { verifySignUp } = require("../middlewares");

router
  .route('/')
  .get(getAllUsers)

router
  .route('/:id')
  .get(getUserById)
  .delete(deleteUserById)
  .patch(editUserById, verifySignUp.checkDuplicateUsernameOrEmail)

// router
//   .route('/search/:key')
//   .post()




module.exports = router;
