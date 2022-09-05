const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require('../models/userModel');
db.prayer = require('../models/prayerModel');
db.role = require('../models/roleModel');
db.truth = require('../models/truthModel');
db.ROLES = ["user" , "admin" , "moderator" , "pastor" , "minister" , "saint" , "mother" , "anonymous" ];

module.exports = db
