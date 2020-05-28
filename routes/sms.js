var express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const axios = require('axios');
var router = express.Router();
var {Alert} = require('../db/mongoose');
var {User} = require('../db/mongoose');
var {Service} = require('../db/mongoose');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

//distance between two coordinates
const distanceBetween = (coordinates1, coordinates2) => {
    [lat1, long1] = coordinates1;
    [lat2, long2] = coordinates2;
    var lat1 = lat1 * Math.PI / 180;
    var lat2 = lat1 * Math.PI / 180;
    var differenceLat = (lat2-lat1) * Math.PI / 180;
    var differenceLong = (long2-long1) * Math.PI / 180;
    var a = Math.sin(differenceLat/2) * Math.sin(differenceLat/2) + Math.cos(lat1) * Math.cos(lat2) *Math.sin(differenceLong/2) * Math.sin(differenceLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return 6371 * c;
}    

router.post('/', async function (req, res, next) {
    const twiml = new MessagingResponse();
    const userInfo = await User.find({phoneNumber: req.body.From});
    if (userInfo.length == 0) {
        twiml.message('Please sign up on Quick Alert as a user')
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
    console.log('testing');
    let currentTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    const addressUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + req.body.Body + ".json?access_token=pk.eyJ1IjoiZXNoYWFuYyIsImEiOiJjazV1Z2RieDYxOWo1M21tanVpdmlxbG54In0.0WdUZzxQ-wDgly1Q44y4lA"
    currentTime = new Date(currentTime);
    const requestCoordinates = await axios.get(addressUrl);
    [long, lat] = requestCoordinates.data.features[0].center;
    const services = await Service.find({});
    let distances = services.map(service => {
        let distance = distanceBetween([service.latitude, service.longitude], [lat, long]);
        return distance
    });
    const index = distances.indexOf(Math.min(...distances));
    const serviceSelected = services[index];
    const alertInformation = {
        name: userInfo.name,
        time: currentTime,
        currentLocation: req.body.Body,
        serviceName: serviceSelected.name,
        phoneNumber: userInfo.phoneNumber,
        age: userInfo.age,
        medicalConditions: userInfo.medicalConditions,
        otherDetails: userInfo.otherDetails,
        responded: false,
        serviceId: serviceSelected._id
    }
    let newAlert = new Alert(alertInformation);
    newAlert.save().then(() => {
        twiml.message('Your information has been sent to ' + serviceSelected.name)
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    });
});

module.exports = router;