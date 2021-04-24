const { User } = require('../models');


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
    console.log(req.body)
    const { username, password } = req.body;
    if( !username || !password) return next ('Missing username or password in userController.createUser.');

    try {
        console.log(`we're in the userController try statement`)
        const newUser = await User.create({ username, password });
        res.locals.user = newUser;
        return next();
    }   catch (err) {
       await User.findOne({ username }, (response) => {
            if (username === response) {
                return res.next(err, {
                    log: `userController.createUser: ERROR: User might already exsist`,
                    message: { err: 'userController.createUser: ERROR: User might already exsist.' }
                });
            }    
        // return res.render('../client/signup', { error: err });
        })
    }    
};

userController.verifyUser = (req, res, next) => {
    console.log(`this is the verifyUser request${req}`)
    //send a req to the db and save the username & pw in res.local
    const { username, password } = req.body;
    try { 
        User.findOne({ username }, (response) => {
            if (response === null) {res.redirect('/signup')};
            if (password === response.password) {
                res.locals.user = response;
            } else return next({
                log: `userController.verifyUser: ERROR: Password does not match`,
                message: { err: 'userController.verifyUser: ERROR: Password does not match.' }
            })
            return next();
        })
    } 
    catch (err) {
        return next(err);
    }
};

module.exports = userController;