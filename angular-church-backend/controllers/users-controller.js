const db = require('../models/index');
const User = db.user;
const bcrypt = require('bcryptjs');
var salt = 10;


exports.getAllUsers = async (req,res) => {
  try{
    const users = await User.find().populate("roles");  // Used to find all Users within the database
    if(users.length > 0){
      return res.status(200).send({
              status: "Success",
              message: "Successfully retrieved users",
              results: users.length,
              data: {
                users: users,
              }
    });
    }

    res.status(200).send({
      status: "Success",
      message: "Successfully retrieved users , No users present",
      results: users.length,
      data: {
        users: users
      }
    });

  }catch(err){
    res.status(500).send({
      status:'Internal Server Error',
      error:err,
      message:err.message ,
      stack: err.stack
    });
  }

}

exports.getUserById = async (req,res) => {
  try{
    const user = await User.findById(req.params.id).populate('roles');

    if (user) {
      return res.status(200).send({
        status:'Success',
        message:'Successfully retrieved user',
        data:{
          user:user
        }
      });
    }
    res.status(404).send({
       status:"Not Found",
       message: "User request not found"
      });

  }catch(err){
    res.status(500).send({
      status:'Internal Server Error',
      error:err,
      message:err.message ,
      stack: err.stack
    });;
  }

}

exports.deleteUserById = async (req,res) => {
  try{
    const {id} = req.params
    const user = await User.findById(req.params.id)

    if(user){
      const deletedUser = await User.findByIdAndRemove(id);
      return res.status(200).send({
        status: "Success",
        message: "Successfully deleted user",
        data: {
          user: deletedUser,
        },
      });
    }

    res.status(404).send({
      status: "Not Found",
      message: "User not found, cannot be deleted",
    })

  }catch(err){
    res.status(500).send({
      status:'Internal Server Error',
      error:err,
      message:err.message ,
      stack: err.stack
    });
  }
}

exports.editUserById = async (req,res) => {
  try{
    const {id} = req.params
    const {_id , firstname , lastname , username , email , pals , roles } = req.body

    const findUser = await User.find({_id:id}).populate('pals', 'roles');


    let createUser = {
      // _id: id,
      firstname:firstname,
      lastname:lastname,
      username:username,
      email:email,
      pals:pals,
      roles:roles
    }

    if(findUser){
      editedUser = await User.findByIdAndUpdate(id, createUser).populate('pals', 'roles');
      return res.status(200).send({
        status:'Success',
        message:'Sucessfully updated user',
        data:{
          oldUser: editedUser
        }
      })
    }
      res.status(404).send({
        status:"Not Found",
        message:'User not found, cannot be updated'
      });


  }catch(err){
    res.status(500).send({
      status:'Internal Server Error',
      error:err,
      message:err.message ,
      stack: err.stack
    });
  }

}

exports.changePasswords = async(req,res) => {
  try{

    const {password} = req.body;
    const {id} = req.params

    const findUser = await User.find({_id:id});

    if(!findUser){
      return res.status(404).send({
        status:'Not Found',
        message:"User not found",
    });
    }

   const newPassword = { password : bcrypt.hashSync(password , salt) }
   const updatedPassword = await User.findByIdAndUpdate(id, newPassword)


    res.status(200).send({
      status:'Success',
      message:'Password successfully changed',
      data:{
        originalPasswordHash: updatedPassword.password,
        updatedPasswordHash: newPassword.password
      }
    })


  }catch(err){
    res.status(500).send({
      status:'Internal Server Error',
      error:err,
      message:err.message ,
      stack: err.stack
    });
  }

}


