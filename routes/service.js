var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var axios = require('axios');
var serviceAuthentication = require('../middleware/serviceAuthentication');

router.post('/login', (req, res, next) => {
    Service.findOne({ email: req.body.email }).then(service => {
        const verified = bcrypt.compare(req.body.password, user.password);
        if (verified) {
            res.send(JSON.stringify({
                authentication: true, 
                information: {
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
        res.send({requestSuccess: true});
    }).catch(err => {
        res.status(404).send("New service was not registered");
    })
})

//route has a middleware for route authentication
router.get('/alerts', serviceAuthentication, (req, res, next) => {
    Alert.find({serviceName: req.body.name}).then(alerts => {
        var JSONdata = JSON.stringify(alerts);
        res.send(JSONdata);
    }).catch(err => {
        res.send("No alerts");
    })
});

//route has a middleware for route authentication
router.patch('/repond', serviceAuthentication, (req, res, next) => {
    Alert.updateMany({name: req.body.name}, {responded: true}).then(() => {
        res.send("Updated");
    }).catch(err => {
        res.status(404).send("Alert does not exist");
    })
});

module.exports = router;