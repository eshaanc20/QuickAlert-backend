var express = require('express');
const http = require('http');
const mongoose = require('mongoose');
var router = express.Router();
var {NewAlert} = require('../db/mongoose');
var {User} = require('../db/mongoose');
var {Service} = require('../db/mongoose');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/', function(req, res, next) {
    const twiml = new MessagingResponse();
    
    User.find({phoneNumber: req.body.From}).then(userInfo => {
        const userInformation = {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phoneNumber: userInfo.phoneNumber,
            age: userInfo.age,
            medicalConditions: userInfo.medicalConditions,
            otherDetails: userInfo.otherDetails,
        }
        const alertInfo = {
            firstName: { type: String },
            lastName: { type: String },
            // date: { type: String },
            // currentLocation: { type: String },
            phoneNumber: { type: String },
            age: { type: Number },
            medicalConditions: { type: String },
            otherDetails: { type: String },
        }
    
        const alert = mongoose.model('Testing', alertInfo);
        const newAlert = new alert(userInformation);
        newAlert.save().then(() => {
            twiml.message('Your information has been sent to ' + 'Goodwill University')
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        })
    })
})

module.exports = router;