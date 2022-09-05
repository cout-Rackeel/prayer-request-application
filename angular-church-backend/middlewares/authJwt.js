const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models/index');
const User = db.user;
const Role = db.role;


verifyToken = async (req, res, next) => {
  try{
    let token = req.session.token;
    if(!token){
      return res.status(403).send({message:"No token provided!"});
    }
    const jwtVerify = await jwt.verify(token , config.secret);
    req.userId = jwtVerify.id;
    next();
  }catch(err){
    return res.status(401).send({message:"Unauthorized!"});
  }
}

// Example Role verification (Not Typed)
  isAdmin = async(req, res, next) => {
    
  try{
    const adminUser = await User.findById(req.userId);

//* The $in uses each value found in the roles array and matches it against the _id property to see if there is a match
    const rolesFound = await Role.find({_id:{$in:adminUser.roles}});
    for (let i = 0; i < rolesFound.length; i++) {
      if (rolesFound[i].name === "admin") {
        next();
        return;
      }
    }
    res.status(403).send({ message: "Require Admin Role!" });
    return;
  }catch(err){
    res.status(500).send({message:err.message, data:'place 1'});
    return;
  }
};

isModerator = async (req, res, next) => {
  
  try{
    modUser = await User.findById(req.userId);
    const rolesFound = await Role.find({_id:{$in:modUser.roles}});
    for (let i = 0; i < rolesFound.length; i++) {
          if (rolesFound[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require moderator Role!" });
        return;
  }catch(err){
    res.status(500).send({message:err.message , data:'place 3'})
  }
};

isPastor = async (req, res, next) => {
  
  try{
    user = await User.findById(req.userId);
    const rolesFound = await Role.find({_id:{$in:user.roles}});
    for (let i = 0; i < rolesFound.length; i++) {
          if (rolesFound[i].name === "pastor") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Pastor Role!" });
        return;
  }catch(err){
    res.status(500).send({message:err.message , data:'place 3'})
  }
};

isSaint = async (req, res, next) => {
  
  try{
    user = await User.findById(req.userId);
    const rolesFound = await Role.find({_id:{$in:user.roles}});
    for (let i = 0; i < rolesFound.length; i++) {
          if (rolesFound[i].name === "saint") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Saint Role!" });
        return;
  }catch(err){
    res.status(500).send({message:err.message , data:'place 3'})
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isPastor,
  isSaint
};


module.exports = authJwt;


