const express = require('express');
const router = express.Router();
const { getUserPrayers } = require('../controllers/user-prayer-controller');


 router
 .route('/:id/prayers')
 .get(getUserPrayers)

 module.exports = router;
