 const db = require('../models/index');
 const Truth = db.truth;


 exports.getTruth = async (req,res) => {
    try{
      const truth = await Truth.find();
      res.status(200).send({
      status:'Success',
      results: truth.length,
      message:"Successfully retrieved truth",
      data:{
       truth:truth
      }})
    }catch(err){
      res.status(500).send({
        status:'Internal Server Error',
        error:err,
        message:err.message ,
        stack: err.stack
      });
    }
 }
