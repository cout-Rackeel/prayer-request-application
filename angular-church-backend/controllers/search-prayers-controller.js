
const Prayer = require('../models/prayerModel');

exports.searchBy = async(req,res) => {
    try{

    const {criterion , searchQuery} = req.body;
    var retVal;

    switch (true) {
      case criterion == 'name':
      retVal = await Prayer.find({name: { $regex: searchQuery }}).populate('commitedToPray');
      res.status(200).send({criterion:criterion, searchVal:retVal});
      break;

      case criterion == 'title':
      retVal = await Prayer.find({title:{ $regex: searchQuery }}).populate('commitedToPray');
      res.status(200).send({criterion:criterion, searchVal:retVal});
      break;

      case criterion == 'date':
        retVal = await Prayer.find({date:{ $regex: searchQuery }}).populate('commitedToPray');
        res.status(200).send({criterion:criterion, searchVal:retVal});
        break;

      case criterion == 'prayerRequest':
      retVal = await Prayer.find({prayerRequest:{ $regex: searchQuery }}).populate('commitedToPray');
      res.status(200).send({criterion:criterion, searchVal:retVal});
      break;

      default:
        res.status(201).send({ting:criterion, message:req.body});

    }



    }catch(err){
      res.status(400).send({message:err.message, noVal:true});
    }
}

//* Redo search feature
