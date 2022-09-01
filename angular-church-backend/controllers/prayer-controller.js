const db = require('../models/index');
const Prayer = db.prayer;


exports.getPrayers = async (req,res) => {
  try{
    const prayers = await Prayer.find().populate('commitedToPray');  // Used to find all prayers within the database
    res.status(200).send(prayers);
  }catch(err){
    res.status(500).send({message:err})
  }

}

exports.getPrayer = async (req,res) => {
  try{
    const prayer = await Prayer.findById(req.params.id).populate('commitedToPray');
      if(prayer){
        return res.status(200).send(prayer);
      }
      res.status(404).send({message:'Prayer request not found'});
  }catch(err){
    res.status(500).send({message:err});
  }

}

exports.createPrayer = async (req,res) => {
  try{

    const newPrayer = await Prayer.create({
      userId: req.body.userId,
      title: req.body.title,
      name: req.body.name,
      prayerRequest: req.body.prayerRequest,
      date: req.body.date,
      status: false,
    })
    res.status(201).send(newPrayer)



  }catch(err){
    res.status(400).send({message:err})
  }




}

exports.editPrayer = async (req,res) => {
  try{
    const {id} = req.params;
    const {userId , title , name , prayerRequest , date , commitedToPray , status , updates} = req.body

    const updateDetails = {
      title: req.body.title,
      name: req.body.name,
      prayerRequest: req.body.prayerRequest,
      date: req.body.date,
      commitedToPray:req.body.commitedToPray , //* Address arrays in arrays
      status: false,
      updates: req.body.updates //* Address arrays in arrays
    }

    const updatedPrayer = await Prayer.findByIdAndUpdate(id , updateDetails).populate('commitedToPray');
    res.status(200).send(`Updated Prayer ${JSON.stringify(updateDetails)}`);

  }catch(err){
    res.status(500).send({message:err.message})
  }
}

exports.deletePrayer = async (req,res) => {
  try{

    const {id} = req.params;
    const deletedPrayer = await Prayer.findByIdAndRemove(id);
    res.status(200).send(`Deleted ${JSON.stringify(deletedPrayer)}`);

  }catch(err){
    res.status(500).send({message:err})
  }
}

