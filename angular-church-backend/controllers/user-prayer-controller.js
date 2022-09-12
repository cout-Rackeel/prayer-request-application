const db = require('../models/index');
const Prayer = db.prayer;


exports.getUserPrayers = async (req,res) => {
  try{
    const prayers = await Prayer.find({userId:req.params.id}).populate("commitedToPray");
    if(prayers.length > 0){
    return res.status(200).send({
            status:'Success',
            results: prayers.length,
            message:"Successfully retrieved user prayers",
            data:{
                 prayers:prayers
                }
  });
    }

    res.status(200).send({
      status:'Success',
            results: prayers.length,
            message:"Successfully retrieved user prayers , No prayers found",
            data:{
                 prayers:prayers
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
