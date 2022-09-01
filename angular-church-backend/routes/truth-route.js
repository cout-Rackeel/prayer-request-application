 const express = require('express');
 const router = express.Router();
 const { getTruth } = require('../controllers/truth-controller');

 router
  .route('/')
  .get(getTruth)

  module.exports = router;