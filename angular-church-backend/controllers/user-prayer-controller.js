const db = require('../models/index');
const Prayer = db.prayer;


exports.getUserPrayers = async (req,res) => {
  try{
    const prayers = await Prayer.find({userId:req.params.id}).populate("commitedToPray");  // Used to find all prayers within the database
    res.status(200).send(prayers);
  }catch(err){
    res.status(500).send({message:err})
  }

}
