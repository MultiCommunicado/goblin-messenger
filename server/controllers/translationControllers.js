const{ User, TransMess, SentMess }= require('../models/userModel');

const translationController = {};

//middleware for storing the message as it is sent in the database
//this message will be sent for translation in the next middleware
//the translated message will be stored in a translated messages database, allowing us to minimize API calls
translationController.createSentMessage = async (req, res, next) => {
    SentMess.create(req.body)
      .then((newSentMess) => {
          //store the newly created message in locals to be able to send to the API for translation
        res.locals.sentMess = newSentMess;
        next();
      })
      .catch(next({
        log: `translationController.CreateSentMessage: ERROR: Did not properly create new sent message`,
        message: { err: 'translationController.CreateSentMessage: ERROR: Check server logs for details' }
    }))
}

//the call to the API that results in the translation of the message after being sent to the database
//this should result in a useable message being returned to the server to be stored in a translated message database
//should also check to make sure that it knows what language the message sent should be sent in
translationController.sendForTranslation = async (req, res, next) => {

}

//the middleware that will handle the creation of the translated message entry in the databse
//the translated message will have the ID's of the sender and recipient included to allow for specific lookup of 
//only the desired messages
translationController.createTranslatedMessage = async (req, res, next) => {

}