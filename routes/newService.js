var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');

router.post('/', (req, res, next) => {
    const serviceInfo = {
        ...req.body
    };
    const newService = new Service(serviceInfo);
    newService.save().then(() => {
        res.send("New service registered");
    }).catch(err => {
        res.send("New service was not registered");
    })
})

module.exports = router;