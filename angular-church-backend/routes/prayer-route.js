const express = require('express');
const router = express.Router();
const { getPrayers,
        getPrayer,
        createPrayer,
        deletePrayer,
        editPrayer,
 } = require('../controllers/prayer-controller');


router
  .route('/')
  .get(getPrayers)
  .post(createPrayer)

router
  .route('/:id')
  .get(getPrayer)
  .delete(deletePrayer)
  .patch(editPrayer)





module.exports = router;
