const db = require('../models/index');
const Prayer = db.prayer;

//! Not Working in Frontend
exports.searchBy = async(req,res) => {
  try{

    const {key} = req.params;
    const {searchQuery} = req.body;
    const searchResult = await Prayer.find({[key]: { $regex: searchQuery, $options:'i'}});

    if(searchResult.length > 0){
      return res.status(200).send({
        status:'Success',
        results: searchResult.length,
        message:"Successfully retrieved results",
        data:{
          result:searchResult
        }
      });
    }

    res.status(404).send({
      status:'Not Found',
      message:'No results for such query',
      data:{
        result:searchResult
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



