const mongoose = require('mongoose');

// userId: string;
// title:string;
// name:string;
// prayerRequest:string;
// commitedToPray:string[];
// status:string;

const PrayerSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  title:{
    type:String,
  },
  name:{
    type:String
  },
  prayerRequest:{
    type:String,
    required: [true , 'A request is required']
  },
  date:{
    type:String
  },
  commitedToPray:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  status:{
    type:Boolean
  },
  updates:[{
    type:String
  }]

} , {collection:'prayers'})

const Prayer =  mongoose.model('Prayer', PrayerSchema);

module.exports = Prayer;