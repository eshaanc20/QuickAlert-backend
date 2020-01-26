var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var axios = require('axios');

router.post('/', (req, res, next) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + req.body.address + ".json?access_token=pk.eyJ1IjoiZXNoYWFuYyIsImEiOiJjazV1Z2RieDYxOWo1M21tanVpdmlxbG54In0.0WdUZzxQ-wDgly1Q44y4lA"
    axios.get(url)
        .then(response => {
            [long, lat] = response.data.features[0].center
            const serviceInfo = {
                ...req.body,
                latitude: lat,
                longitude: long,
            };
            const newService = new Service(serviceInfo);
            newService.save().then(() => {
                res.send("New service registered");
            }).catch(err => {
                res.send("New service was not registered");
            })
            res.send(response.data.features[0].center)
        })
})

module.exports = router;