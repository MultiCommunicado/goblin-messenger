const cookieController = {};

// store the user id in a cookie for auth
cookieController.setSSIDCookie = (req, res, next) => {
    res.cookie('ssid', res.locals.user._id, { httpOnly: true});
    return next();
};

module.exports = cookieController;