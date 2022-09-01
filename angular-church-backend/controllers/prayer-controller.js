const db = require('../models/index');
const Prayer = db.prayer;


exports.getPrayers = async (req,res) => {
  try{
    const prayers = await Prayer.find();  // Used to find all prayers within the database
    res.status(200).send(prayers);
  }catch(err){
    res.status(500).send({message:err})
  }

}

exports.getPrayer = async (req,res) => {
  try{
    const prayer = await Prayer.findById(req.params.id);
    (async () => {
      if(prayer){
        return res.status(200).send(prayer);
      }
      res.status(404).send({message:'Prayer request not found'});
    }) (); // IFFY function used to test prayer constant after the completion of the findById async func
  }catch(err){
    res.status(500).send({message:err});
  }


}

exports.createPrayer = async (req,res) => {
  try{

  const {userId , title , name , prayerRequest , date , commitedToPray , status , updates} = req.body

    const newPrayer = await Prayer.create({
      userId: req.body.userId,
      title: req.body.title,
      name: req.body.name,
      prayerRequest: req.body.prayerRequest,
      date: req.body.date,
      commitedToPray: [],
      status: false,
      updates: []
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
      commitedToPray: [],
      status: false,
      updates: []
    }

    const updatedPrayer = await Prayer.findByIdAndUpdate(id , updateDetails);
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

exports.searchBy = async(req,res) => {
  try{

  const {type , criterion} = req.body;
  var retVal;

  switch (true) {
    case type == 'name':
    retVal = await Prayer.find({name: criterion});
    res.status(200).send({type:type, searchVal:retVal});
    break;

    case type == 'title':
    retVal = await Prayer.find({title: criterion});
    res.status(200).send({type:type, searchVal:retVal});
    break;

    default:
      res.send('Not found');

  }

  // if (type == 'name') {
  //   res.status(200).send(searchVal);
  // }else{
  //   res.status(201).send(type);
  // }


  }catch(err){
    res.status(400).send({message:err.message, noVal:true});
  }
}
