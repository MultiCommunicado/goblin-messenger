const cookieController = {};

//setting a cookie with a random number
cookieController.setCookie = (req, res, next) => {
    res.cookie('goblin', 'shark');
    res.cookie('secret', Math.floor(Math.random() * 100).toString);
    return next();
};

// store the user id in a cookie for auth
cookieController.setSSIDCookie = (req, res, next) => {
    res.cookie('ssid', res.locals.user.id, { httpOnly: true});
    return next();
};

module.exports = cookieController;