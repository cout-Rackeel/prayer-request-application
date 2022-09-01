const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const morgan = require('morgan');
const prayerRoute = require('./routes/prayer-route');
const userPrayerRoute = require('./routes/user-prayer-route');
const searchPrayerRoute = require('./routes/search-prayers-route');
const userRoute = require('./routes/user-route');
const truthRoute = require('./routes/truth-route');
const corsOptions = {origin : "http://localhost:4200"};
const dotenv = require('dotenv');
const { setResponseHeader } =  require('./middlewares/setResponse');

dotenv.config({path:'./config/config.env'})

const app = express();

app.use(morgan('dev'));
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({extended:true})); // parse requests of content-type - application/x-www-form-urlencoded
app.use(cors('*'));
app.use(
  cookieSession({
    name:"user-session",
    secret:process.env.COOKIE_SECRET,
    httpOnly:true,
    code:'ball '
  })
);


// MIDDLEWARES 
app.use((req, res, next) =>{
  switch (req.method){
    case 'DELETE':
        console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[31m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'PUT':
        console.log(`\x1b[44m\x1b[4m[ANGULAR-APP3.1]\x1b[0m - \x1b[32m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'PATCH':
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[34m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'POST':
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[33m${req.method}\x1b[0m - ${req.path}`);
      break;
    case 'GET':
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[35m${req.method}\x1b[0m - ${req.path}`);
      break;
    default:
      console.log(`\x1b[43m\x1b[1m[ANGULAR-APP3.1]\x1b[0m - \x1b[35m${req.method}\x1b[0m - ${req.path}`);
  }
  next();
});

// ROUTES MIDDLEWARE
  app.use('/api/prayers', setResponseHeader , prayerRoute);
  app.use('/api/truth', setResponseHeader , truthRoute);
  app.use('/api/user/prayers', setResponseHeader , userPrayerRoute);
  app.use('/api/search/prayers', setResponseHeader , searchPrayerRoute);

  // app.use('/api/user' , userRoute);
  // app.use('/api/auth/signin', signinRoute);
  // app.use('/api/auth/signup', signupRoute);
  // app.use('/api/auth/signout', signoutRoute); 
  // app.use('/api/test/all',)
  // app.use('/api/test/user',)
  // app.use('/api/test/mod',)
  // app.use('/api/test/admin',)


module.exports = app