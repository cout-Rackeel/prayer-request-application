
const Prayer = require('../models/prayerModel');

exports.searchBy = async(req,res) => {
    try{
    
    const {type , criterion} = req.body;
    var retVal;

    switch (true) {
      case type == 'name':
      retVal = await Prayer.find({name: { $regex: criterion }});
      res.status(200).send({type:type, searchVal:retVal});
      break;

      case type == 'title':
      retVal = await Prayer.find({title:{ $regex: criterion }});
      res.status(200).send({type:type, searchVal:retVal});
      break;

      case type == 'date':
        retVal = await Prayer.find({date:{ $regex: criterion }});
        res.status(200).send({type:type, searchVal:retVal});
        break;

      case type == 'prayerRequest':
      retVal = await Prayer.find({prayerRequest:{ $regex: criterion }});
      res.status(200).send({type:type, searchVal:retVal});
      break;

      default:
        res.send('Not found');
      
    }

   
    
    }catch(err){
      res.status(400).send({message:err.message, noVal:true});
    }
}