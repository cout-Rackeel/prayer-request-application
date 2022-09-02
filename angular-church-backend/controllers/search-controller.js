const db = require('../models/index');
const Prayer = db.prayer;

exports.searchBy = async(req,res) => {
  try{

    const {key} = req.params;
    const {searchQuery} = req.body;
    const searchResult = await Prayer.find({[key]: { $regex: searchQuery, $options:'i'}});

    if(searchResult){
      res.status(200).send({result:searchResult});
    }else{
      res.status(404).send({message:'No results for such query', result:searchResult})
    }

  }catch(err){
    res.status(500).send({message:err.message});
  }
}



