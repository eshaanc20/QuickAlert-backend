var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var axios = require('axios');

router.post('/', (req, res, next) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + req.body.address + ".json?access_token=pk.eyJ1IjoiZXNoYWFuYyIsImEiOiJjanhoM2Vqa2swYTVhM3NtdnNmZWhoNGY3In0.K7eRFoNOsMMBo88EmoRspA"
    axios.get(url)
        .then(response => {
            res.send(response)
        })
    // const serviceInfo = {
    //     ...req.body
    // };
    // const newService = new Service(serviceInfo);
    // newService.save().then(() => {
    //     res.send("New service registered");
    // }).catch(err => {
    //     res.send("New service was not registered");
    // })
})

module.exports = router;