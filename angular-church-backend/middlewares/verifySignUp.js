const User = require('../models/userModel');
const {role} = require('../models/index');

//* Passed

checkDuplicateUsernameOrEmail = async (req, res , next) => {
  try{
    const username = await User.findOne({username:req.body.username})
    const email = await User.findOne({email:req.body.email});
    const {_id} = req.body;

    if(!_id){
      if(username){
        res.status(400).send({
            status:'Bad request',
            message: "Failed! Username is already in use!",
            data:{
              username: username.username,
              errType:'username',
            }
          })
        return;
      }
      if(email){
        res.status(400).send({
          status:'Bad request',
          message: "Failed! Email is already in use!",
          data:{
             email: email.email,
             errType:'email',
          }
        })
        return;
      }
    }else{
      if(username && _id != username._id){
        res.status(400).send({
          status:'Bad request',
          message: "Failed! Username is already in use!",
          data:{
            username: username.username,
            errType:'username',
          }
        })
        return;
      }
      if(email && _id != email._id){
        res.status(400).send({
          status:'Bad request',
          message: "Failed! Email is already in use!",
          data:{
             email: email.email,
             errType:'email',
          }
        })
        return;
      }
    }
    next();

  }catch(err){
    res.status(500).send({
      status:'Internal Server Error',
      error:err,
      message:err.message ,
      stack: err.stack
    });
      return;
  }
};
checkRolesExisted = async (req, res, next) => {
  try{

    const roles = await role.find();
    const rolesIdArr = roles.map((role) => role.id);

      if (req.body.roles || req.body.roles == typeof Array) {
        for (let i = 0; i < req.body.roles.length; i++) {

            req.body.roles.forEach((role) => {
              if(!rolesIdArr.includes(role)) {
                res.status(400).send({
                  status:'Bad request',
                  message: `Failed! Role ${req.body.roles} does not exist in Known Roles Array!`,
                  data: {
                    knownRoles : rolesIdArr
                  }
                });
                return;
              }
            })
        }
      }
      next();
  }catch(err){
    res.status(500).send({
      status:'Internal Server Error',
      error:err,
      message:err.message ,
      stack: err.stack
    });
    return;
  }

};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}

module.exports = verifySignUp;
