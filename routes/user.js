var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var {User} = require('../db/mongoose');
var bcrypt = require('bcrypt');
var userAuthentication = require('../middleware/userAuthentication');
var jwt = require('jsonwebtoken');

router.post('/login', async function (req, res, next) {
    User.findOne({ email: req.body.email }).then(async function (user) {
        const verified = await bcrypt.compare(req.body.password, user.password);
        if (verified) {
            console.log('testing');
            const authenticationToken = await jwt.sign({id: user._id}, "quickalertapplication");
            res.send(JSON.stringify({
                authentication: true, 
                token: authenticationToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
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
router.patch('/:id', userAuthentication, (req, res, next) => {
    console.log(req.params.id);
    User.updateOne({_id: req.params.id}, {
        ...req.body
    }).then(() => {
        res.send({requestCompleted: true});
    }).catch((err) => {
        res.send({requestCompleted: false});
    })
});

module.exports = router;