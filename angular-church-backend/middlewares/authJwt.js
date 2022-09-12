const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user;
const Role = db.role;

//*Passed

verifyToken = async (req, res, next) => {
  try {
    let token = req.session.token;

    if (!token) {
      return res.status(403).send({
        status: "Forbidden",
        message: "No token provided!",
      });
    }

    const jwtVerify = await jwt.verify(token, config.secret);

    if (!jwtVerify.id) {
      return res.status(401).send({
        status: "Invalid credientials",
        message: "Unauthorized!",
      });
    }

    req.userId = jwtVerify.id;
    next();
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

isUser = async (req, res, next) => {
  //* The $in uses each value found in the roles array and matches it against the _id property to see if there is a match
  try {
    const user = await User.findById(req.userId);
    const rolesFound = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < rolesFound.length; i++) {
      if (rolesFound[i].name === "user") {
        next();
        return;
      }
    }
    res.status(401).send({
      status: "Invalid credientials",
      message: "This resource requires the user role!",
      data:{
        userRoles: rolesFound
      },
    });
    return;
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

isAdmin = async (req, res, next) => {
  try {
    const adminUser = await User.findById(req.userId);

    const rolesFound = await Role.find({ _id: { $in: adminUser.roles } });
    for (let i = 0; i < rolesFound.length; i++) {
      if (rolesFound[i].name === "admin") {
        next();
        return;
      }
    }
    res.status(401).send({
      status: "Invalid credientials",
      message: "This resource requires the admin role!",
      data:{
        userRoles: rolesFound
      },
    });
    return;
  } catch (err) {
    res.status(500).send({
      error: err,
      message: err.message,
      stack: err.stack,
    });
    return;
  }
};

isModerator = async (req, res, next) => {
  try {
    const modUser = await User.findById(req.userId);

    const rolesFound = await Role.find({ _id: { $in: modUser.roles } });
    for (let i = 0; i < rolesFound.length; i++) {
      if (rolesFound[i].name === "moderator") {
        next();
        return;
      }
    }
    res.status(401).send({
      status: "Invalid credientials",
      message: "This resource requires the moderator role!",
      data:{
        userRoles: rolesFound
      },
    });
    return;
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
    return;
  }
};

isPastor = async (req, res, next) => {
  try {
    user = await User.findById(req.userId);
    const rolesFound = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < rolesFound.length; i++) {
      if (rolesFound[i].name === "pastor") {
        next();
        return;
      }
    }
    res.status(401).send({
      status: "Invalid credientials",
      message: "This resource requires the pastor role!",
      data:{
        userRoles: rolesFound
      },
    });
    return;
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

isSaint = async (req, res, next) => {
  try {
    user = await User.findById(req.userId);
    const rolesFound = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < rolesFound.length; i++) {
      if (rolesFound[i].name === "saint") {
        next();
        return;
      }
    }
    res.status(401).send({
      status: "Invalid credientials",
      message: "This resource requires the saint role!",
      data:{
        userRoles: rolesFound
      },
    });
    return;
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

isMinister = async (req, res, next) => {
  try {
    const minister = await User.findById(req.userId);

    const rolesFound = await Role.find({ _id: { $in: minister.roles } });
    for (let i = 0; i < rolesFound.length; i++) {
      if (rolesFound[i].name === "minister") {
        next();
        return;
      }
    }
    res.status(401).send({
      status: "Invalid credientials",
      message: "This resource requires the minister role!",
      data:{
        userRoles: rolesFound
      },
    });
    return;
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};
isMother = async (req, res, next) => {
  try {
    user = await User.findById(req.userId);
    const rolesFound = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < rolesFound.length; i++) {
      if (rolesFound[i].name === "mother") {
        next();
        return;
      }
    }
    res.status(401).send({
      status: "Invalid credientials",
      message: "This resource requires the mother role!",
      data:{
        userRoles: rolesFound
      },
    });
    return;
  } catch (err) {
    res.status(500).send({
      status: "Internal Server Error",
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isUser,
  isModerator,
  isPastor,
  isSaint,
  isMinister,
  isMother,
};

module.exports = authJwt;
