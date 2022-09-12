const db = require('../models/index');
const Role = db.role;


//* Passed

exports.getAllRoles = async (req,res) => {
  try{
    const roles = await Role.find();  // Used to find all roles within the database
    if(roles.length > 0){
    return res.status(200).send({
            status: "Success",
            message: "Successfully retrieved roles",
            results: roles.length,
            data: {
              roles: roles
            }
    });
  }

  res.status(200).send({
    status: "Success",
    message: "Successfully retrieved roles , No roles present",
    results: roles.length,
    data: {
      roles: roles
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

exports.getRoleById = async (req,res) => {
  try{
    const role = await Role.findById(req.params.id);

      if(role){
        return res.status(200).send({
          status: "Success",
          message: "Successfully retrieved role",
          data: {
            role: role
          }
        });
      }
      res.status(404).send({
        status: "Not Found",
        message:'Role request not found'
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

exports.createRole = async (req,res) => {
  try{

    const newRole = await Role.create({
      name: req.body.name,
    })
    res.status(201).send({
      status: "Successfully Created",
      message: "Successfully created role",
      data: {
        role: newRole
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

exports.deleteRoleById = async (req,res) => {
  try{
    const {id} = req.params;
    const role = await Role.findById(id);

      if(role){
        const deletedRole = await Role.findByIdAndRemove(id);
        return res.status(200).send({
          status: "Success",
          message: "Successfully deleted role",
          data: {
            role: deletedRole,
          },
        });
      }

      res.status(404).send({
        status: "Not Found",
        message: "Role not found, cannot be deleted",
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


