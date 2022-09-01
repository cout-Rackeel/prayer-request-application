const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname:{
    type:String,
    required:[true, 'Your first name is required']
  },

  lastname:{
    type:String,
    required:[true, 'Your last name is required']
  },

  username:{
    type:String,
    required:[true, 'Your username is required'],
    unique:[true , 'This username is taken']
  },

  email:{
    type:String,
    required:[true, 'Your email is required'],
    lowercase:true
  },

  password:{
    type:String,
    required:[true, 'Your password is required'],
  },

  pals:[{
      type:mongoose.Schema.Types.ObjectId,
      unique:[true ,'You are already pals with this user'],
      sparse:true,

  }],

  roles:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }]

},{collection: 'users'})

const User = mongoose.model('User' , userSchema);

module.exports = User;
