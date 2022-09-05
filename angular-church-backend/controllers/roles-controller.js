const db = require('../models/index');
const Role = db.role;


exports.getAllRoles = async (req,res) => {
  try{
    const roles = await Role.find();  // Used to find all roles within the database
    res.status(200).send(roles);
  }catch(err){
    res.status(500).send({message:err})
  }

}

exports.getRoleById = async (req,res) => {
  try{
    const role = await Role.findById(req.params.id);

      if(role){
        return res.status(200).send(role);
      }
      res.status(404).send({message:'Role request not found'});

  }catch(err){
    res.status(500).send({message:err});
  }

}

exports.createRole = async (req,res) => {
  try{

    const newRole = await Role.create({
      name: req.body.name,
    })
    res.status(201).send(newRole)

  }catch(err){
    res.status(400).send({message:err})
  }




}

exports.deleteRoleById = async (req,res) => {
  try{
    const {id} = req.params;
    const role = await Role.findById(id);

      if(role){
        const deletedRole = await Role.findByIdAndRemove(id);
        return res.status(200).send(`Deleted ${JSON.stringify(deletedRole)}`);
      }

      res.status(404).send({message:'Role not found cannot be deleted'});

  }catch(err){
    res.status(500).send({message:err.message});
  }
}


