
const express = require('express');
const router = express.Router();
const { searchBy } = require('../controllers/search-controller');

router
  .route('/prayers/:key')
  .post(searchBy)

module.exports = router;
