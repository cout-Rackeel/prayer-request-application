
//? TO BE REVIEWED COPIED
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth-controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  //* Sign up route
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  // Sign In route
  app.post("/api/auth/signin", controller.signin)
  //Sign Out route
  app.post("/api/auth/signout" , controller.signout)
};