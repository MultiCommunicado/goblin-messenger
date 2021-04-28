const { User, TransMess, SentMess } = require('../models');
const { Translate } = require('@google-cloud/translate').v2;
const path = require('path');
const translationController = {};
const projectId = '112305914504973967363';
//the service account file is the file associated with the project on Whit's google drive account
//get in contact with him to figure out how to get a copy that won't be put on github for security reasons
//or to start your own account and set up the serviceAccountFile
//just make sure to not go over 500,000 characters translated, which I know is a lot
//but just try to avoid sending looping calls to translate, ya feel?
const keyFilename = path.resolve(
  __dirname,
  './../pandawhaleiterationproject-ce75c9c97be2.json'
);
const tranlsate = new Translate({ projectId, keyFilename });

//function that calls to google Tranlsate API

async function textTranslate(text, target) {
  console.log(`this is before api call`);
  let translation = await tranlsate.translate(text, target);
  console.log(`this is after api call`);

  console.log('Translation:' + translation);
  //the returned value is an array with the first index being a string,
  //the second index being data about the call
  return translation[0];
}

//middleware for storing the message as it is sent in the database
//this message will be sent for translation in the next middleware
//the translated message will be stored in a translated messages database, allowing us to minimize API calls

//request body coming in should be formatted this way for code to work
/* {
    id: the Id of the user sending the message
    senderUsername: the message sender's username
    targetUsername: the message recipient's username
    language: the language code assigned from the initial sender
    message: the actual text to translate
}*/
translationController.createSentMessage = async (req, res, next) => {
  console.log('createSent fired');
  console.log(req.body.message);
  //conditional to make sure that the request wasn't sent with any required fields empty
  if (req.body.message == '') {
    res.locals.noMessage = true;
    return res.status(200).json(res.locals);
  }
  if (req.body.targetUsername == '') {
    res.locals.noRecipient = true;
    return res.status(200).json(res.locals);
  }
  // this gets the target, or reciever's info like language, id, etc.
  await User.findOne({ username: req.body.targetUsername })
    .then((response) => {
      //check to see if the inputted username is contained in database,
      //if not send back something to say hey nothing found
      if (!response) {
        res.locals.userNotFound = true;
        return res.status(200).json(res.locals);
      } else {
        res.locals.target = response;
        SentMess.create({
          senderId: req.body.id,
          senderLang: req.body.language,
          senderUsername: req.body.senderUsername,
          receiverUsername: res.locals.target.username,
          receiverId: res.locals.target._id,
          receiverLang: res.locals.target.language,
          input: req.body.message,
        }).then((newSentMess) => {
          //store the newly created message in locals to be able to send to the API for translation
          res.locals.sentMess = newSentMess;
          next();
        });
      }
    })
    .catch((err) => {
      if (err)
        next({
          log: `translationController.CreateSentMessage: ERROR: Did not properly create new sent message`,
          message: {
            err:
              'translationController.CreateSentMessage: ERROR: Check server logs for details',
          },
        });
    });
};

//the call to the API that results in the translation of the message after being sent to the database
//this should result in a useable message being returned to the server to be stored in a translated message database
//should also check to make sure that it knows what language the message sent should be sent in
translationController.sendForTranslation = async (req, res, next) => {
  //check to see if translation is necessary, if not just pass along message
  if (res.locals.target.language === req.body.language) {
    res.locals.translation = req.body.message;
    next();
  } else {
    res.locals.translation = await textTranslate(
      res.locals.sentMess.input,
      res.locals.target.language
    );
    next();
  }
};

//the middleware that will handle the creation of the translated message entry in the databse
//the translated message will have the ID's of the sender and recipient included to allow for specific lookup of
//only the desired messages
translationController.createTranslatedMessage = async (req, res, next) => {
  console.log('create transMess fired');
  TransMess.create({
    senderId: req.body.id,
    senderLang: req.body.language,
    senderUsername: req.body.senderUsername,
    receiverUsername: res.locals.target.username,
    receiverId: res.locals.target._id,
    receiverLang: res.locals.target.language,
    input: res.locals.translation,
  });
  res.locals.user = res.locals.target;
  next();
};

// this will get the messages that have been sent to the user and translated
// as well as the messages that the user has sent pre translation.

translationController.getMessages = async (req, res, next) => {
  if (res.locals.signUpWithExistingUser) return next();

  if (res.locals.user) {
    console.log(req.params.username);

    res.locals.messages = {};
    res.locals.messages.received = await TransMess.find({
      receiverId: res.locals.user._id,
    });
    res.locals.messages.sent = await SentMess.find({
      senderId: res.locals.user._id,
    });
    return next();
  } else {
    next();
  }
};

module.exports = translationController;
