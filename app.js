const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
//const session = require('express-session');

mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(config.database)
  .then(() => {
    console.log('Connected to database ' + config.database);
  })
  .catch((err) => {
    console.log('Database error: ' + err);
  });



const app = express();

const users = require('./routes/users');

const port = 3000;

//CORS Middleware
app.use(cors());


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
//app.use(
 //   session({
   //   secret: 'secretword', 
 //     resave: true,
 //     saveUninitialized: true,
 //   })
 // );
app.use(passport.initialize());
//app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port '+port);
});