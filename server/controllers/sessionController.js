const { Session } = require('../models');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieID: req.cookies.ssid }, (err, session) => {
    if (err) return next(`Error in sessionController.isLoggedIn: ${JSON.strigify(err)}`);
    //no session found, send back nothing for now...
    if (!session) res.redirect('/signup');
    // session found, send back userid that is in cookie
    return next();
  })
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  console.log("now in Session Creator")
  if (!res.locals.user) return next();
  try {
    Session.create({ cookieID: res.locals.user._id }, (err, session) => {
      console.log(`this is the session reponse from the db: ${session}`)
      if (err) {
        console.log(err);
        return next(`Error in sessionController.startSession: ${err}`); 
      }
      return next();
    })
  } catch (error) {
    console.log('duplicate key, skipping ', error)
    next();
  }
};
 
module.exports = sessionController;