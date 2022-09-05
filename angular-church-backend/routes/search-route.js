
const express = require('express');
const router = express.Router();
const { searchBy } = require('../controllers/search-controller');

router
  .route('/prayers/:key')
  .post(searchBy)

module.exports = router;



// const controller = require("../controllers/search-controller");

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       'Access-Control-Access-Origin','*',
//       "Access-Control-Allow-Headers",
//       "Origin, Content-Type, Accept"
//     );
//     next();
//   });
//   app.post("/api/search/prayers/:key", controller.searchBy);
//   //Sign Out route

// };
