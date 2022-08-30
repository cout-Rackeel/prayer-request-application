const mongoose = require('mongoose');

const TruthSchema = new mongoose.Schema({
  title:{
    type:String
  },
  body:[{
    type:String
  }],
  scriptures:[{
    type:String
  }]
} , {collection:'truth'})

const Truth = mongoose.model('Truth', TruthSchema);

module.exports = Truth;