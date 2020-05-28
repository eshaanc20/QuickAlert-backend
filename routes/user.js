var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var {User} = require('../db/mongoose');
var bcrypt = require('bcrypt');
var userAuthentication = require('../middleware/userAuthentication');

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        const verified = bcrypt.compare(req.body.password, user.password);
        if (verified) {
            res.send(JSON.stringify({
                authentication: true, 
                user: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    phoneNumber: user.phoneNumber,
                    age: user.age,
                    medicalConditions: user.medicalConditions,
                    otherDetails: user.otherDetails
                }
            }));
        } else {
            res.send(JSON.stringify({authentication: false, information: null}));
        }
    }).catch(err => {
        res.send("User is not registered in the database");
    })
})

router.post('/signup', async function (req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const userInfo = {
        ...req.body
    };
    userInfo.password = "";
    userInfo.password = hashedPassword;
    const newUser = new User(userInfo);
    newUser.save().then(() => {
        res.send("New user registered");
    }).catch(err => {
        res.send("New user was not registered");
    })
})

//route has a middleware for route authentication
router.patch('/update', userAuthentication, (req, res, next) => {
    User.updateOne({email: req.body.email}, {
        ...req.body
    }).then(() => {
        res.send('Database updated')
    }).catch((err) => {
        res.send('Error')
    })
});

module.exports = router;