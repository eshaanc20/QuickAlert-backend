var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var {User} = require('../db/mongoose');

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user.password == req.body.password) {
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

router.post('/signup', (req, res, next) => {
    const userInfo = {
        ...req.body
    };
    const newUser = new User(userInfo);
    newUser.save().then(() => {
        res.send("New user registered");
    }).catch(err => {
        res.send("New user was not registered");
    })
})

router.patch('/update', (req, res, next) => {
    User.updateOne({email: req.body.email}, {
        ...req.body
    }).then(() => {
        res.send('Database updated')
    }).catch((err) => {
        res.send('Error')
    })
});

module.exports = router;