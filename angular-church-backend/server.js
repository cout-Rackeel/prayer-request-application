const app = require('./app');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const port = process.env.PORT || 3250;
const db = require('./models/index');
const Role = db.role;
const ROLES = db.ROLES;

dotenv.config({path:'./config/config.env'})

const DB_CONN = process.env.NODE_ENV === 'production' ?
process.env.DATABASE_PRODUCTION.replace('<PWD>' , process.env.DATABASE_PASSWORD) : process.env.DATABASE;

mongoose.connect(DB_CONN)
  .then(conn => {
    console.log(`Successfully connected to MongoDB ... ${process.env.DATABASE}`);
  })
  .catch( err => {
    console.error("Connection error", err);
    process.exit();
  });



// For each role defined in the db config file this function will save it to the mongoose document
saveDoc = (rolesArr) => {


  rolesArr.forEach((role) => {
    new Role({
      name:role
    }).save(err => {
      if (err) {
        console.log("error", err);
      }
      console.log(`added '${role}' to roles collection`);
    });
  })

}

// Intialize Roles Document in Mongo Database
 initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      saveDoc(ROLES);
    }
  })
}


// routes
require('./routes/auth-route')(app);
require('./routes/test-user-route')(app);

app.listen(port , () => console.log(`Connected to port... ${port}`));
