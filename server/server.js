const express = require('express');
const path = require('path');
const cors = require('cors');
const sessionController = require('./controllers/sessionController');
const app = express();
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const bodyParser = require('body-parser')


const PORT = 3000;

//** Not sure if this will be needed or is overkill.  **//
// const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/goblin-messengertest' : 'mogodb:localhost/goblin-messengerdev';
// mongoose.connect(mongoURI);

app.use(cors());


//** Automatically parse urlencoded body content from incoming requests and place it in req.body **//
app.use(bodyParser.urlencoded({extended: true}));

//** adds middleware to parse cookies from the HTTP request **//
// app.use(cookieParser());

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html')); 
}); 


//** Sign Up **//
app.get ('/signup', (req, res) => {
    res.render('./..client/signup', {error : null});
});

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

// //** Authorized Routes **//
// app.get('/secret', sessionController.isLoggedIn, userController.getAllUsers, (req, res) => {
//     res.render('./../client/secret', {users: res.locals.users});
// });

//** 404 error **//
app.use('*', (req, res) => res.status(404).send('Not Found'));

//** Global Error **//
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send('Internal Server Error')
});

app.listen(PORT, () =>{console.log(`Listening at port ${PORT}.`)});

module.exports = app;