const express = require('express');
const router = express.Router();
const { getUserPrayers } = require('../controllers/user-prayer-controller');


 router
 .route('/:id')
 .get(getUserPrayers)

 module.exports = router;