const express = require('express');
const router = express.Router();
const { searchBy } = require('../controllers/search-prayers-controller');


router
.route('/')
.get(searchBy)

module.exports = router;