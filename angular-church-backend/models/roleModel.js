const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'The name of the role is required'],
    unique:[true , 'This role is already in the database']
  }

}, {collection:'roles'})


const Role = mongoose.model('Role',RoleSchema);

module.exports = Role;
