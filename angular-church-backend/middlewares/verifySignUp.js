const User = require('../models/userModel');
const {ROLES} = require('../models/index');

console.log(`${ROLES}`);

checkDuplicateUsernameOrEmail = async (req, res , next) => {
  try{
    const username = await User.findOne({username:req.body.username})
    const email = await User.findOne({email:req.body.email});

    if(username){
      res.status(400).send({ message: "Failed! Username is already in use!", errType:'username' })
      return;
    }

    if(email){
      res.status(400).send({ message: "Failed! Email is already in use!", errType:'email' })
      return;
    }
    
    next();
     
  }catch(err){
      res.status(500).send({message:err.message, data:'an err'})
      return;
  }
};


checkRolesExisted = (req, res, next) => {

    if (req.body.roles || req.body.roles == typeof Array) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles)) {
          res.status(400).send({
            message: `Failed! Role ${req.body.roles} does not exist!`
          });
          return;
        }
      }
    }
    next();
  };

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}

module.exports = verifySignUp;



// * Example Code
// const db = require("../models");
// const ROLES = db.ROLES;
// const User = db.user;
// checkDuplicateUsernameOrEmail = (req, res, next) => {
//   // Username
//   User.findOne({
//     username: req.body.username
//   }).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//     if (user) {
//       res.status(400).send({ message: "Failed! Username is already in use!" });
//       return;
//     }
//     // Email
//     User.findOne({
//       email: req.body.email
//     }).exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       if (user) {
//         res.status(400).send({ message: "Failed! Email is already in use!" });
//         return;
//       }
//       next();
//     });
//   });
// };
// checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!ROLES.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: `Failed! Role ${req.body.roles[i]} does not exist!`
//         });
//         return;
//       }
//     }
//   }
//   next();
// };
// const verifySignUp = {
//   checkDuplicateUsernameOrEmail,
//   checkRolesExisted
// };
// module.exports = verifySignUp;
