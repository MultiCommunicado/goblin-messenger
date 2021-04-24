const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const PORT = 3000;

app.use(cors());

//** Automatically parse urlencoded body content from incoming requests and place it in req.body **//
app.use(bodyParser.urlencoded({extended: true}));

//** adds middleware to parse cookies from the HTTP request **//
// app.use(cookieParser());

//** Sign Up **//
app.get ('/signup', (req, res) => {
    res.render('./..client/signup', {error : null});
});

//** Signup **//
app.post('/signup', 
userController.createUser,
sessionController.startSession,
cookieController.setSSIDCookie,
(req, res) => {
    res.redirect('/secret');
});

//** Login **//
app.post('/login', 
userController.verifyUser,
sessionController.startSession,
cookieController.setSSIDCookie,
(req, res) => {
    res.redirect('/home');
});

//route handler to serve the basic file
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html')); 
}); 

//** 404 error **//
app.use('*', (req, res) => res.status(404).send('Not Found'));

//** Global Error **//
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () =>{console.log(`Listening at port ${PORT}.`)});

module.exports = app;