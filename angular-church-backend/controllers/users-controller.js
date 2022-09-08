const db = require('../models/index');
const User = db.user;
const bcrypt = require('bcryptjs');
var salt = 10;


exports.getAllUsers = async (req,res) => {
  try{
    const users = await User.find().populate("roles");  // Used to find all Users within the database
    res.status(200).send(users);
  }catch(err){
    res.status(500).send({message:err})
  }

}

exports.getUserById = async (req,res) => {
  try{
    const user = await User.findById(req.params.id).populate('roles');

      if(user){
        return res.status(200).send(user);
      }
      res.status(404).send({message:'User request not found'});

  }catch(err){
    res.status(500).send({message:err});
  }

}

exports.deleteUserById = async (req,res) => {
  try{
    const {id} = req.params
    const user = await User.findById(req.params.id)

      if(user){
        const deletedUser = await User.findByIdAndRemove(id);
        return res.status(200).send(`Deleted ${JSON.stringify(deletedUser)}`);
      }

      res.status(404).send({message:'User not found cannot be deleted'});

  }catch(err){
    res.status(500).send({message:err.message});
  }
}

exports.editUserById = async (req,res) => {
  try{
    const {id} = req.params
    const {_id , firstname , lastname , username , email , password , pals , roles } = req.body

    const findUser = await User.find({_id:id}).populate('pals', 'roles');
    let createUser = {
      // _id: id,
      firstname:firstname,
      lastname:lastname,
      username:username,
      email:email,
      password:bcrypt.hashSync(password, salt),
      pals:pals,
      roles:roles
    }

    if(findUser){
      editedUser = await User.findByIdAndUpdate(id, createUser).populate('pals', 'roles');
      res.status(200).send(`Successfully Edited User ${editedUser}`)
    }else{
      res.status(404).send({message:'User not found'});
    }


  }catch(err){
    res.status(500).send({message:err.message});
  }

}


