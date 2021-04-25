const cookieController = {};

// store the user id in a cookie for auth
cookieController.setSSIDCookie = (req, res, next) => {
    console.log(`we're in the cookie controller now`)
    res.cookie('ssid', res.locals.user._id, { httpOnly: true});
    console.log(`This is the response for the set cookie from the db ${res.locals} `)
    return next();
};

module.exports = cookieController;