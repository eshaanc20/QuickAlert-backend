var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var {Alert} = require('../db/mongoose');
var axios = require('axios');
var serviceAuthentication = require('../middleware/serviceAuthentication');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

router.post('/login', async function (req, res, next) {
    Service.findOne({ email: req.body.email }).then(async function(service) {
        const verified = await bcrypt.compare(req.body.password, service.password);
        if (verified) {
            const authenticationToken = await jwt.sign({id: service._id}, "quickalertapplication");
            res.send(JSON.stringify({
                authentication: true, 
                token: authenticationToken,
                service: {
                    name: service.name,
                    email: service.email,
                    type: service.type,
                    address: service.address,
                }
            }));
        } else {
            res.send(JSON.stringify({authentication: false, information: null}));
        }
    }).catch(err => {
        res.status(404).send("Service is not registered in databse");
    })
})

router.post('/signup', async function (req, res, next) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + req.body.address + ".json?access_token=pk.eyJ1IjoiZXNoYWFuYyIsImEiOiJjazV1Z2RieDYxOWo1M21tanVpdmlxbG54In0.0WdUZzxQ-wDgly1Q44y4lA"
    const coordinates = await axios.get(url);
    [long, lat] = coordinates.data.features[0].center;
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const serviceInfo = {
        ...req.body,
        latitude: lat,
        longitude: long,
    };
    serviceInfo.password = "";
    serviceInfo.password = hashedPassword;
    const newService = new Service(serviceInfo);
    newService.save().then(() => {
        res.send({requestCompleted: true});
    }).catch(err => {
        res.status(404).send("New service was not registered");
    })
})

//route has a middleware for route authentication
router.get('/alerts', serviceAuthentication, (req, res, next) => {
    Alert.find({serviceName: req.params.name}).then(alerts => {
        var JSONdata = JSON.stringify(alerts);
        res.send(JSONdata);
    }).catch(err => {
        res.send("No alerts");
    })
});

//route has a middleware for route authentication
router.patch('/alert/:id', serviceAuthentication, (req, res, next) => {
    Alert.updateOne({_id: req.params.id}, {...req.body}).then(() => {
        res.send({requestCompleted: true});
    }).catch(err => {
        res.status(404).send("Alert does not exist");
    })
});

module.exports = router;