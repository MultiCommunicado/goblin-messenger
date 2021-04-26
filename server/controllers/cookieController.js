const cookieController = {};

// store the user id in a cookie for auth
cookieController.setSSIDCookie = (req, res, next) => {
    console.log(`we're in the cookie controller now`);
    console.log(req.cookies);
    console.log(res.locals.user)
    if (!res.locals.user) {
        console.log('no user found! skipping cookie controller.')
        return next();
    }
    res.cookie('ssid', res.locals.user._id, { httpOnly: true });
    console.log(`This is the response for the set cookie from the db ${res.locals.user} `);
    return next();
};

module.exports = cookieController;