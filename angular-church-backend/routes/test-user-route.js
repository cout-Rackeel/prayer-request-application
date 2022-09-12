
const { authJwt } = require("../middlewares");
const controller = require("../controllers/test-user-controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/mod",[authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);
  app.get("/api/test/pastor",[authJwt.verifyToken,authJwt.isPastor],controller.pastorBoard);
  app.get("/api/test/saint",[authJwt.verifyToken,authJwt.isSaint],controller.saintBoard);
  app.get("/api/test/user", [authJwt.verifyToken , authJwt.isUser], controller.userBoard);
  app.get("/api/test/mother",[authJwt.verifyToken,authJwt.isMother],controller.motherBoard);
  app.get("/api/test/minister",[authJwt.verifyToken,authJwt.isMinister],controller.ministerBoard);
};

