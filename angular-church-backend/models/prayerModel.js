const mongoose = require('mongoose');

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
    ref:'User',
    unique:[true ,'You have already commited to pray'],
    sparse:true,
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
