const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUserById, editUserById, changePasswords } = require('../controllers/users-controller');
const { verifySignUp } = require("../middlewares");

router
  .route('/')
  .get(getAllUsers)

router
  .route('/:id')
  .get(getUserById)
  .delete(deleteUserById)
  .patch(editUserById, verifySignUp.checkDuplicateUsernameOrEmail)

router
  .route('/:id/changePassword')
  .patch(changePasswords)

// router
//   .route('/search/:key')
//   .post()




module.exports = router;
