const { User } = require('../models');


const userController = {};

userController.getAllUsers = (req, res, next) => {
    try {
        User.find({}, (err, users) => {
            console.log(users)
            res.locals.users = users;
            return next();
        });
        
    } catch (err) {
        return next(`Error in userController.getAllUsers: ${JSON.stringify(err)}`);
    }
};

userController.findOneUser = (req, res, next) => {
  console.log('req body', req.body);

  User.findOne({ username: req.body.username })
    .then(data => {
      console.log('data', data);
      if (data) {
        console.log('existing user:', data);
        res.locals.signUpWithExistingUser = true;
      }
      else res.locals.signUpWithExistingUser = false;
      return next();
    })
    .catch(
      err => next({
          log: `error in userController.findOneUser: ${err}`,
          message: {err: `error in findOneUser controller`}
      })
    );
}

userController.createUser = async (req, res, next) => {
    console.log(req.body)
    const { username, password, language } = req.body;
    if (res.locals.signUpWithExistingUser) return next();
    if(username === ''){
        res.locals.noUsername = true;
        res.json(res.locals);
    }
    if(password === ''){
        res.locals.noPassword = true;
        res.json(res.locals);
    }
    if(language === ''){
        res.locals.noLanguage = true;
        res.json(res.locals);
    }


    try {
        console.log(`we're in the userController try statement`)
        const newUser = await User.create({ username, password, language });
        res.locals.user = newUser;
        return next();
    }   catch (err) {
        User.findOne({ username }, (err, response) => {
            if (username === response) {
                return next(err, {
                    log: `userController.createUser: ERROR: User might already exsist`,
                    message: { err: 'userController.createUser: ERROR: User might already exsist.' }
                });
            }    
        })
    }    
};

userController.verifyUser = (req, res, next) => {
    console.log(`this is the verifyUser request username: ${req.body.username} password: ${req.body.password}`)
    //send a req to the db and save the username & pw in res.local
    const { username, password } = req.body;

    // const username = req.body.username;
    // const password = req.body.password;

    try { 
        User.findOne({ username }, (err, response ) => {
            console.log(password)
            console.log(`This is the verify user response from the db: ${response}`)
            if (response === null) {
                res.locals.userUnknown = true;
            } else if (password === response.password) {
                console.log(`User logged in as username: ${username}`)
                res.locals.user = response;
            } else res.locals.noMatch = true;
            return next();
            })
        }
    catch (err) {
        return next(err);
    }
};

module.exports = userController;