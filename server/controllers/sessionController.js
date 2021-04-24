const { Session } = require('../models');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
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
  console.log("Session Creator")
  Session.create({ cookieID: res.locals.user._id}, (err, session) => {
    if (err) return next(`Error in sessionController.startSession: ${err}`); 
    return next();
  })
};

module.exports = sessionController;