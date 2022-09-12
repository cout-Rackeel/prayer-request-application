const express = require('express');
const router = express.Router();
const { getAllRoles, getRoleById, deleteRoleById, createRole } = require('../controllers/roles-controller');

router
  .route('/')
  .get(getAllRoles)
  .post(createRole)
router
  .route('/:id')
  .get(getRoleById)
  .delete(deleteRoleById)

module.exports = router;
