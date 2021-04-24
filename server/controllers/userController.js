const User = require('../models/userModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
    try {
        User.find({}, (err, users) => {
            res.locals.users = users;
            return next();
        });
        
    } catch (err) {
        return next(`Error in userController.getAllUsers: ${JSON.stringify(err)}`);
    }
};

userController.createUser = async (req, res, next) => {
    const { username, password } = req.body;
    if( !username || !password) return next ('Missing username or password in userController.createUser.');

    try {
        const newUser = await User.create({ username, password });
        res.locals.user = newUser;
        return next();
    }   catch (err) {
        return res.render('../client/signup', { error: err });
    }
};

userController.verifyUser = (req, res, next) => {
    //hey go look in db for this username 
    const { username, password } = req.body;
    
};

module.exports = userController;