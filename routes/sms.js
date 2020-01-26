var express = require('express');
const http = require('http');
const mongoose = require('mongoose');
var router = express.Router();
var {Alert} = require('../db/mongoose');
var {User} = require('../db/mongoose');
var {Service} = require('../db/mongoose');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/', function(req, res, next) {
    const twiml = new MessagingResponse();
    
    User.find({phoneNumber: req.body.From}).then(userInfo => {
        const userInformation = {
            name: userInfo[0].name,
            phoneNumber: userInfo[0].phoneNumber,
            age: userInfo[0].age,
            medicalConditions: userInfo[0].medicalConditions,
            otherDetails: userInfo[0].otherDetails,
        }
        let newAlert = new Alert(userInformation)
        newAlert.save().then(() => {
            twiml.message('Your information has been sent to ' + 'Goodwill University')
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        })
    })
})

module.exports = router;