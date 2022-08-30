 const db = require('../models/index');
 const Truth = db.truth;

 exports.getTruth = async (req,res) => {
    try{
      const truth = await Truth.find();
      res.status(200).send(truth)
    }catch(err){
      res.status(500).send({message:'Error retriving truth'})
    }
 }