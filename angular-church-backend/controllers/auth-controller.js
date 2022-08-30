const config = require('../config/auth.config.js');
const db = require('../models/index');
const User =  db.user;
const Role = db.role;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = 10;

// exports.signup = (req,res) => {

//   //* Step 1
//   const user = new User({
//     firstname: req.body.firstname,
//     lastname:req.body.lastname,
//     username:req.body.username,
//     email:req.body.email,
//     password:bcrypt.hashSync(req.body.password, salt),
//     pals:req.body.pals
//   });

//   //? TO BE REVIEWED COPIED
//   user.save((err,user) => {
//     if (err) {
//       res.status(500).send({ message: err.stack , data:'place 6' });
//       return;
//     }
//     if (req.body.roles) {
//       Role.find(
//         {
//           name: { $in: req.body.roles },
//         },
//         (err, roles) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
//           user.roles = roles.map((role) => role._id);
//           user.save((err) => {
//             if (err) {
//               res.status(500).send({ message: err });
//               return;
//             }
//             res.send({ message: "User was registered successfully!" });
//           });
//         }
//       );
//     } else {
//       Role.findOne({ name: "user" }, (err, role) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }
//         user.roles = [role._id];
//         user.save((err) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
//           res.send({ message: "User was registered successfully!" });
//         });
//       });
//     }
//   });

// };

 exports.signup = async (req,res) => {
  try{
    const user = new User({
      firstname: req.body.firstname,
      lastname:req.body.lastname,
      username:req.body.username,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password, salt),
      pals:req.body.pals
    });

    let savedUser = await user.save();
    let rolesFound = await Role.find({name:{$in: req.body.roles}});
    let defaultRole = await Role.findOne({name: "user"})

    if(req.body.roles){
      savedUser.roles = rolesFound.map((role) => role._id);
      savedUser.roles.push(defaultRole._id);
      savedUser = await savedUser.save();
      res.send({ message: `User was registered successfully yes roles! ${JSON.stringify(req.body.roles)}` });
    }else{
      savedUser.roles = [defaultRole._id];
      savedUser = await savedUser.save();
      res.send({ message: "User was registered successfully no roles!" });
    }

  }catch(err){
    res.status(500).send({ message: err.stack , data:'place 6' });
    return;
  }
};

exports.signin = async (req, res) => {
  try{

    //* Test to see if Username is found within the database
    const userPassword = req.body.password;
    const username = req.body.username;
    const currentUser = await User.findOne({username:username}).populate("roles","-__v");
    
    if(!currentUser){
      return res.status(404).send({message:'User not found!! , check username',
      userNotFound: true
    });
    }

    //* Test to see if Password is correct
    const IsPasswordVaild =  await bcrypt.compare(userPassword , currentUser.password);

    if(!IsPasswordVaild){
      return res.status(401).send({message:"Invalid Password",
      passwordInvalid:true
    });
    }

    //*id is the string version of the _id property which is of type ObjectID
    var token =  await jwt.sign({id:currentUser.id}, config.secret ,{expiresIn:86400}); //* Expires in one day
    var positions = [];

    
    currentUser.roles.forEach((role) => positions.push(`ROLE_${role.name.toUpperCase()}`));

    // Stores token to the client
    req.session.token = token;
    res.status(200).send({
      _id:currentUser._id,
      firstname:currentUser.firstname,
      lastname: currentUser.lastname,
      username:currentUser.username,
      email:currentUser.email,
      roles:positions
    });


  }catch(err){
    res.status(500).send({message:err.message , secret:config.secret});
  }
 
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};