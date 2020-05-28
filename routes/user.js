var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var {User} = require('../db/mongoose');
var bcrypt = require('bcrypt');
var userAuthentication = require('../middleware/userAuthentication');
var jwt = require('jsonwebtoken');
var CryptoJs = require('crypto-js');

router.post('/login', async function (req, res, next) {
    User.findOne({ email: req.body.email }).then(async function (user) {
        const verified = await bcrypt.compare(req.body.password, user.password);
        let decryptedBytes1 = CryptoJs.AES.decrypt(user.medicalConditions, 'quickalertapplication');
        let decryptedText1 = decryptedBytes1.toString(CryptoJs.enc.Utf8);
        let decryptedBytes2 = CryptoJs.AES.decrypt(user.otherDetails, 'quickalertapplication');
        let decryptedText2 = decryptedBytes2.toString(CryptoJs.enc.Utf8);
        if (verified) {
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
                    medicalConditions: decryptedText1,
                    otherDetails: decryptedText2
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
    let userInfo = {...req.body}
    let encryptedText1 = CryptoJs.AES.encrypt(user.medicalConditions, 'quickalertapplication').toString();
    let encryptedText2 = CryptoJs.AES.encrypt(user.otherDetails, 'quickalertapplication').toString();
    userInfo.medicalConditions = encryptedText1;
    userInfo.otherDetails = encryptedText2;
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
router.patch('/', userAuthentication, (req, res, next) => {
    let updatedInfo = {...req.body};
    let encryptedText1 = CryptoJs.AES.encrypt(user.medicalConditions, 'quickalertapplication').toString();
    let encryptedText2 = CryptoJs.AES.encrypt(user.otherDetails, 'quickalertapplication').toString();
    updatedInfo.medicalConditions = encryptedText1;
    updatedInfo.otherDetails = encryptedText2;
    User.updateOne({_id: req.userId}, {
        ...updatedInfo
    }).then(() => {
        res.send({requestCompleted: true});
    }).catch((err) => {
        res.send({requestCompleted: false});
    })
});

module.exports = router;