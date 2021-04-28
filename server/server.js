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


app.get ('/messages/:username', 
    //gets user info based on the cookie associated with get request
    cookieController.findUserByCookie, 
    //uses user info from previous middleware to 
    translationController.getMessages, 
    //sends along pertinent info
    (req, res) =>{
        console.log(req.params.username)
        res.status(200).json(res.locals);
})

//Get request, ask db for filterd messages. 
/* 
a single array, where 
(senderUsername = myUsername OR senderUsername = friendUsername) 
AND (receiverUsername = friendUsername  OR receiverUsername = myUsername)

obj {
    
}

*/
/*
{
array1 ={
senderUsername = myUsername 
receiverUsername = friendUsername 
messagelanduger for myusername
}

array2 = {
senderUsername = friendUsername
receiverUsername = myUsername
}
}
*/



//
app.get ('/messages', 
    //gets user info based on the cookie associated with get request
    cookieController.findUserByCookie, 
    //uses user info from previous middleware to 
    translationController.getMessages, 
    //sends along pertinent info
    (req, res) =>{
        res.status(200).json(res.locals);
})

//logout route to end session and clear cookie
app.get ('/signout', 
    //this should end the session, but we don't have any calls coming here as of now
    sessionController.endSession,
    //anon function should clear the cookie associated with the page
    (req, res) =>{
        res.clearCookie('ssid');
})

//** Signup **//
//when signup buttong is triggered, lanches a post req;
app.post('/signup', 
    //first go to the create user middleware
    userController.findOneUser,
    userController.createUser,
    //then go to start session
    sessionController.startSession,
    // then set cookie
    cookieController.setSSIDCookie,
    // get sent message data
    translationController.getMessages,
    (req, res) => {
        //once all the above is complete, respond with redirecting to main message page
        if (res.locals.signUpWithExistingUser) res.status(200).json({ hasAccount: true });

        else res.status(200).json(res.locals);
});

//** Login **//
//when login button is triggered, launch post req
app.post('/login', 
    //first go check and make sure this username exsist, and password matches
userController.verifyUser,
    //then go to start session

// sessionController.startSession,
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
app.post('/send', 
    //middleware that checks the message, and stores it pre translation if entry is good
    translationController.createSentMessage, 
    //middleware that translates the message if need be and stores it in locals
    translationController.sendForTranslation, 
    //middleware that stores the translated message
    translationController.createTranslatedMessage, 
    //middleware that grabs the new message list to allow state to update with response
    translationController.getMessages,
    //anon function that sends the response
    (req, res) =>{
        res.status(200).json(res.locals);
})

// route handler to delete sessions and remove cookies

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