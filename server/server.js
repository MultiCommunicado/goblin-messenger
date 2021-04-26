const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const translationController = require('./controllers/translationControllers');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = 3000;

// app.use(cors());

//** Serve all compiled files when running the production build **/
app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/build', express.static(path.join(__dirname, '../build')));

//** Automatically parse urlencoded body content from incoming requests and place it in req.body **//
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//** adds middleware to parse cookies from the HTTP request **//
app.use(cookieParser());

//** Sign Up **//
app.get ('/signup', (req, res) => {
    res.render('./..client/signup', {error : null});
});

//** Signup **//
//when signup buttong is triggered, lanches a post req;
app.post('/signup', 
    //first go to the create user middleware
    userController.createUser,
    //then go to start session
    sessionController.startSession,
    // then set cookie
    cookieController.setSSIDCookie,
    (req, res) => {
        //once all the above is complete, respond with redirecting to main message page
        res.redirect('/');
});

//** Login **//
//when login button is triggered, launch post req
app.post('/login', 
    //first go check and make sure this username exsist, and password matches
userController.verifyUser,
    //then go to start session

sessionController.startSession,
    // then set cookie

cookieController.setSSIDCookie,

    // then get the translated message data for the user

translationController.getMessages,

(req, res) => {
    //not going to redirect, send a response of user info
    res.status(200).json(res.locals);
    }
);


//**  Message Submit for database storage and translation  **/
app.post('/send', translationController.createSentMessage, translationController.sendForTranslation, translationController.createTranslatedMessage, (req, res) =>{
    console.log('anonymous function fired');
    res.sendStatus(200);
})

//route handler to serve the basic file
app.get('/', (req, res) => {
    //check for session, if session is active
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html')); 
    //if session is not active, then redirect to ./login
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