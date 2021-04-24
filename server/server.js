const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();


const PORT = 3000;

app.use(cors());

//route to handle the user creation requests
app.post('/user/createUser', (req, res) =>{
    
});
//route to handle login requests
app.post('/user/login', (req, res) =>{
    
});
//route to handle the creation, storage, translation and storage of translated messages
app.post('/message/send', (req, res) =>{
    
});
//route to handle the eventual requests for a users messages
app.get('/message/recieve', (req, res) =>{
    
});

//route to handle getting user information
app.get('/user', (req, res) =>{
    
})

//route handler to serve the basic file
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html')); 
}); 
//route handler for misplaced routes
app.use((req, res) => res.status(404).send('No pants here'));

//global error handler, use to send error messages from middleware to see where error occurs
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